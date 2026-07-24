import { useLocale } from "../lib/locale";
import { ui } from "../content/ui";

export interface PendingNoteProps {
  /** What is missing, in the reader's language. */
  children: string;
  /** Optional heading when the note stands in for a whole section. */
  title?: string;
}

/**
 * Marks content that cannot be published because the business has not supplied
 * or confirmed the underlying fact.
 *
 * This exists so the site never has to choose between inventing a fact and
 * silently dropping a section the reader expects. Everything it covers is
 * tracked in docs/project/PENDING_DECISIONS.md; removing a note is the last
 * step of closing the decision behind it.
 */
export default function PendingNote({ children, title }: PendingNoteProps) {
  const locale = useLocale();

  return (
    <aside className="pending">
      <span className="pending-label">{ui.pendingLabel[locale]}</span>
      {title ? <p className="pending-title">{title}</p> : null}
      <p>{children}</p>
    </aside>
  );
}
