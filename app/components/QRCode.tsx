"use client";

import React from 'react';
import { QRCodeSVG } from 'qrcode.react';

interface QRCodeProps {
  value: string;
  size?: number;
}

export default function QRCode({ value, size = 256 }: QRCodeProps) {
  return (
    <div className="flex flex-col items-center">
      <div className="bg-white p-4 rounded-lg shadow-md">
        <QRCodeSVG
          value={value}
          size={size}
          bgColor={"#ffffff"}
          fgColor={"#000000"}
          level={"L"}
          includeMargin={false}
        />
      </div>
      <p className="mt-4 text-center text-sm">
        Scan to join the group
      </p>
    </div>
  );
}
