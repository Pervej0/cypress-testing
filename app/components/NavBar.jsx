import NavItem from "./NavItem";

const navItems = [
  {
    label: "Why Cypress?",
    path: "/",
    testData: "root-route",
  },
  {
    label: "Overview",
    path: "/overview",
    testData: "overview-route",
  },
  {
    label: "Fundamentals",
    path: "/fundamentals",
    testData: "fundamentals-route",
  },
  {
    label: "Forms",
    path: "/forms",
    testData: "forms-route",
  },
  {
    label: "Examples",
    path: "/examples",
    testData: "examples-route",
  },
  {
    label: "Component",
    path: "/component",
    testData: "component-route",
  },
  {
    label: "Best Practices",
    path: "/best-practices",
    testData: "best-practices-route",
  },
];

export default function NavBar() {
  return (
    <ul className="nav-bar">
      {navItems.map((item) => (
        <NavItem
          key={item.label}
          testData={item.testData}
          label={item.label}
          path={item.path}
        />
      ))}
    </ul>
  );
}
