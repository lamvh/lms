import { useNavigate } from 'react-router-dom';
import { to12 } from '../../lib/time';
import { classes, teacherById, DAYS_FULL, todayIndex } from '../../data/edunex';

const card = 'bg-surface border border-line rounded-lg shadow-sh-card';

/** Weekly timetable grid: one column per day, non-paused sessions placed by day. */
export function Calendar() {
  const navigate = useNavigate();
  const byDay = DAYS_FULL.map((_, d) =>
    classes
      .filter((c) => c.status !== 'paused')
      .flatMap((c) => c.schedule.filter((s) => s.d === d).map((s) => ({ ...s, class: c })))
      .sort((a, b) => a.s.localeCompare(b.s)),
  );

  return (
    <div className="flex flex-col gap-[18px] max-w-[1180px]">
      <div>
        <h1 className="font-head text-[23px] font-bold text-ink-900">Timetable</h1>
        <p className="text-sm text-ink-500 mt-1">This week across all programs and rooms.</p>
      </div>
      <div className="grid grid-cols-7 gap-2.5 max-[980px]:grid-cols-1">
        {DAYS_FULL.map((day, d) => (
          <div key={day} className={`${card} p-2.5 flex flex-col gap-2 ${d === todayIndex ? 'ring-2 ring-a-400' : ''}`}>
            <div className="font-head text-[12px] font-bold uppercase tracking-[.06em] text-ink-400 px-1">
              {day.slice(0, 3)}{d === todayIndex && <span className="text-a-700"> · today</span>}
            </div>
            {byDay[d].length === 0 && <div className="text-[11.5px] text-ink-300 px-1 py-2">No sessions</div>}
            {byDay[d].map((s, i) => {
              const t = teacherById(s.class.teacher);
              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => navigate(`/admin/classes/${s.class.id}`)}
                  className="text-left rounded-sm p-2 border-l-[3px] bg-surface-2 hover:bg-surface-3 transition-colors"
                  style={{ borderColor: s.class.color }}
                >
                  <div className="font-head text-[12px] font-bold text-ink-800">{to12(s.s)}</div>
                  <div className="text-[12px] font-semibold text-ink-900 leading-tight mt-0.5">{s.class.name}</div>
                  <div className="text-[11px] text-ink-500 mt-0.5">{t?.short} · {s.class.room}</div>
                </button>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Calendar;
