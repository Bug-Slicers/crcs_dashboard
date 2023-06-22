import React from "react";

export default function Footer() {
  return (
    <footer className="bg-primary text-white p-4">
      <div className="max-w-7xl mx-auto">
        <p className="text-center text-sm">
          &copy; {new Date().getFullYear()} CRCS Portal. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
