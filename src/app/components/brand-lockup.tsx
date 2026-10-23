import Image from "next/image";

export function BrandLockup() {
  return <span className="brand-lockup"><Image src="/kgs-wordmark-transparent.png" alt="" width={700} height={125} className="brand-wordmark" /><small>GLOBAL SOLUTION PRIVATE LIMITED</small></span>;
}
