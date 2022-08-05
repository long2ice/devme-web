import { Disclosure } from "@headlessui/react";
import { Link, useLocation } from "react-router-dom";

const navigation = [
  { name: "Overview", href: "/" },
  { name: "GitProvider", href: "/git" },
];

function classNames(...classes: Array<string>) {
  return classes.filter(Boolean).join(" ");
}

export default function Nav() {
  const location = useLocation();
  return (
    <Disclosure as="nav" className="bg-gray-800">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <img
                className="h-8 w-8"
                src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
                alt="Workflow"
              />
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={classNames(
                      item.href === location.pathname
                        ? "bg-gray-900 text-white"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white",
                      "px-3 py-2 rounded-md text-sm font-medium"
                    )}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Disclosure>
  );
}
