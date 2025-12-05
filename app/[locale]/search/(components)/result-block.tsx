import Link from "next/link";

interface Props {
  title: string;
  url: string;
  parentTitle?: string;
  className?: string;
}

export default function ResultBlock({
  title,
  url,
  parentTitle,
  className,
}: Props) {
  return (
    <div>
      <Link
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={`flex cursor-pointer flex-col rounded-md p-3 pl-6 transition-colors hover:bg-neutral-200 ${className || ""}`}
      >
        <p className="text-base font-medium text-black">{title}</p>
        <span className="text-sm font-normal text-neutral-600">
          {parentTitle}
        </span>
      </Link>
      <hr />
    </div>
  );
}
