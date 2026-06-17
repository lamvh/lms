import { useNavigate, useParams } from 'react-router-dom';
import { Icon } from '../../components/Icon';
import { Avatar } from '../../components/Avatar';
import { Button } from '../../components/Button';
import { StatusBadge } from '../../components/StatusBadge';
import { studentById, classById, focusStudent, homework, results, payments } from '../../data/edunex';

const card = 'bg-surface border border-line rounded-lg shadow-sh-card';

/** Admin student detail. Rich data is on the focus student; others show profile + enrolment. */
export function StudentDetail() {
  const { studentId } = useParams();
  const navigate = useNavigate();
  const s = studentId ? studentById(studentId) : undefined;

  if (!s) {
    return (
      <div className="max-w-[1100px]">
        <Button variant="ghost" size="sm" onClick={() => navigate('/admin/students')}>
          <Icon name="chevL" size={16} />Back to students
        </Button>
        <p className="text-ink-500 mt-4">Student not found.</p>
      </div>
    );
  }

  const isFocus = s.id === focusStudent.id;
  const enrolled = (isFocus ? focusStudent.classes ?? [] : []).map((id) => classById(id)).filter(Boolean);

  return (
    <div className="flex flex-col gap-5 max-w-[1100px]">
      <button onClick={() => navigate('/admin/students')} className="flex items-center gap-1.5 text-ink-500 text-[13.5px] font-semibold w-fit">
        <Icon name="chevL" size={16} />Back to students
      </button>

      <div className={`${card} p-[22px_24px] flex items-center gap-4 flex-wrap`}>
        <Avatar name={s.name} short={s.short} color={s.color} size={64} ring />
        <div className="flex-1 min-w-[200px]">
          <h1 className="font-head text-[24px] font-bold text-ink-900">{s.name}</h1>
          <p className="text-sm text-ink-500 mt-1">Learning focus: {s.year}</p>
        </div>
        <Button variant="soft" size="sm"><Icon name="mail" size={15} />Message</Button>
      </div>

      {isFocus ? (
        <div className="grid grid-cols-2 gap-5 max-[980px]:grid-cols-1">
          <Section title="Enrolled programs">
            {enrolled.map((c) => (
              <div key={c!.id} className="flex items-center gap-3 px-4 py-3 border-t border-line-soft first:border-t-0 cursor-pointer hover:bg-surface-2" onClick={() => navigate(`/admin/classes/${c!.id}`)}>
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: c!.color }} />
                <span className="flex-1 text-[14px] font-semibold text-ink-900">{c!.name}</span>
                <StatusBadge status={c!.status} />
              </div>
            ))}
          </Section>

          <Section title="Homework">
            {homework.map((h) => (
              <div key={h.id} className="flex items-center gap-3 px-4 py-3 border-t border-line-soft first:border-t-0">
                <div className="flex-1 min-w-0">
                  <div className="text-[14px] font-semibold text-ink-900 truncate">{h.title}</div>
                  <div className="text-xs text-ink-500">Due {h.due}</div>
                </div>
                <span className={`text-[11.5px] font-semibold px-2 py-0.5 rounded-pill ${h.status === 'graded' ? 'bg-success-bg text-success' : h.status === 'submitted' ? 'bg-info-bg text-info' : 'bg-warn-bg text-warn'}`}>
                  {h.grade ?? h.status}
                </span>
              </div>
            ))}
          </Section>

          <Section title="Results">
            {results.map((r) => {
              const c = classById(r.class);
              return (
                <div key={r.class} className="px-4 py-3 border-t border-line-soft first:border-t-0">
                  <div className="flex items-center justify-between">
                    <span className="text-[14px] font-semibold text-ink-900">{c?.name}</span>
                    <span className="font-head font-bold text-a-700">{r.overall}</span>
                  </div>
                  <div className="text-xs text-ink-500 mt-1">{r.items.map(([k, v]) => `${k}: ${v}`).join(' · ')}</div>
                </div>
              );
            })}
          </Section>

          <Section title="Payments">
            {payments.map((p) => (
              <div key={p.id} className="flex items-center gap-3 px-4 py-3 border-t border-line-soft first:border-t-0">
                <div className="flex-1 min-w-0">
                  <div className="text-[14px] font-semibold text-ink-900 truncate">{p.item}</div>
                  <div className="text-xs text-ink-500">{p.id} · {p.date} · {p.method}</div>
                </div>
                <span className="font-head font-bold text-ink-800">${p.amount}</span>
                <span className={`text-[11.5px] font-semibold px-2 py-0.5 rounded-pill ${p.status === 'paid' ? 'bg-success-bg text-success' : 'bg-warn-bg text-warn'}`}>{p.status}</span>
              </div>
            ))}
          </Section>
        </div>
      ) : (
        <div className={`${card} p-6 text-ink-500 text-sm`}>
          Detailed academic records are available for enrolled learners in this prototype dataset.
        </div>
      )}
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className={`${card} overflow-hidden`}>
      <h3 className="font-head text-[15px] font-bold text-ink-900 px-4 py-3 border-b border-line">{title}</h3>
      <div>{children}</div>
    </div>
  );
}

export default StudentDetail;
