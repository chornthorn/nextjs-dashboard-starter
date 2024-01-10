import { HomeIcon, Settings, UsersIcon } from "lucide-react";
import {
  ArrowsCounterClockwise,
  Calculator,
  ChartBar,
  CurrencyCircleDollar,
  Garage,
  Gear,
  Gift,
  Notebook,
  Receipt,
  Scales,
  Truck,
  UsersFour,
  Wallet,
  Warehouse,
} from "@phosphor-icons/react";

export interface MenuItem {
  title: string;
  href: string;
  icon: any;
  items?: MenuItem[] | null;
}

const menuItem: MenuItem[] = [
  {
    title: "Dashboard",
    href: "/",
    icon: <HomeIcon />,
    items: [
      {
        title: "Dashboard",
        href: "/",
        icon: <HomeIcon />,
      },
    ],
  },
  {
    title: "Sales",
    href: "/sales",
    icon: <UsersIcon />,
    items: [
      {
        title: "Sales Invoices",
        href: "/sales-invoices",
        icon: <Receipt />,
      },
      {
        title: "Sales Payments",
        href: "/sales-payments",
        icon: <Wallet />,
      },
      {
        title: "Customers",
        href: "/customers",
        icon: <UsersFour />,
      },
      {
        title: "Sales Items",
        href: "/sales-items",
        icon: <Gift />,
      },
    ],
  },
  {
    title: "Reports",
    href: "/reports",
    icon: <Garage />,
    items: [
      {
        title: "General Ledger",
        href: "/general-ledger",
        icon: <Notebook />,
      },
      {
        title: "Profit & Loss",
        href: "/profit-loss",
        icon: <Calculator />,
      },
      {
        title: "Balance Sheet",
        href: "/balance-sheet",
        icon: <CurrencyCircleDollar />,
      },
      {
        title: "Cash Flow",
        href: "/cash-flow",
        icon: <ArrowsCounterClockwise />,
      },
    ],
  },
  {
    title: "Settings",
    href: "/settings",
    icon: <Settings />,
    items: [
      {
        title: "Chart of Accounts",
        href: "/accounts",
        icon: <ChartBar />,
      },
      {
        title: "Tax Templates",
        href: "/tax-templates",
        icon: <Scales />,
      },
      {
        title: "My Account",
        href: "/my-account",
        icon: <Gear />,
      },
    ],
  },
];

export { menuItem };
