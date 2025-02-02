const fs = require("fs");
const path = require("path");
const readline = require("readline");
const { google } = require("googleapis");

const SCOPES = ["https://www.googleapis.com/auth/gmail.readonly"];
const TOKEN_PATH = path.join(__dirname, "token.json");

// Load client secrets from a file
const authenticate = async () => {
  const credentials = JSON.parse(fs.readFileSync("credentials.json"));
  const { client_secret, client_id, redirect_uris } = credentials;
  const oAuth2Client = new google.auth.OAuth2(
    client_id,
    client_secret,
    redirect_uris[0]
  );
  // Check if we already have a token
  if (fs.existsSync(TOKEN_PATH)) {
    const token = JSON.parse(fs.readFileSync(TOKEN_PATH));
    oAuth2Client.setCredentials(token);
    return oAuth2Client;
  }

  // Generate a new token if not found
  return getNewToken(oAuth2Client);
};

// Get a new token if not available
const getNewToken = (oAuth2Client) => {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES,
  });
  console.log("Authorize this app by visiting this URL:", authUrl);

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve, reject) => {
    rl.question("Enter the code from that page here: ", (code) => {
      rl.close();
      oAuth2Client.getToken(code, (err, token) => {
        if (err) return reject(err);
        oAuth2Client.setCredentials(token);
        fs.writeFileSync(TOKEN_PATH, JSON.stringify(token));
        console.log("Token stored to", TOKEN_PATH);
        resolve(oAuth2Client);
      });
    });
  });
};

// Fetch the latest email from Gmail
const fetchOTP = async () => {
  try {
    const auth = await authenticate();
    const gmail = google.gmail({ version: "v1", auth });

    // Get the latest email
    const response = await gmail.users.messages.list({
      userId: "me",
      maxResults: 1,
      q: "in:inbox category:primary",
    });

    if (!response.data.messages || response.data.messages.length === 0) {
      console.log("No emails found.");
      return;
    }

    const messageId = response.data.messages[0].id;
    const message = await gmail.users.messages.get({
      userId: "me",
      id: messageId,
    });

    // Decode the message body
    const bodyData = message.data.payload.parts
      ? message.data.payload.parts[0].body.data
      : message.data.payload.body.data;

    const decodedBody = Buffer.from(bodyData, "base64").toString("utf8");
    const otp = decodedBody.match(/\d{6}/)[0];

    console.log("Latest Email: ", otp);
    return otp;
  } catch (error) {
    console.error("Error fetching latest email:", error);
  }
};

module.exports = fetchOTP;
