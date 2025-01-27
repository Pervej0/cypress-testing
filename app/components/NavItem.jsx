import Link from "next/link";

export default function NavItem({ label, path, testData }) {
  return (
    <Link test-data={testData} href={path}>
      {label}
    </Link>
  );
}
