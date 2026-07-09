// Pure display pill — theme-aware via global adminStatusPill classes.
'use client';

interface Props {
  status: string;
}

export default function LeadStatusTag({ status }: Props) {
  const s = (status ?? 'new').toLowerCase();

  return (
    <span className="adminStatusPill" data-status={s}>
      {s}
    </span>
  );
}
