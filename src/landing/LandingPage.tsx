import { Link } from 'react-router-dom';
import { ImageSlot } from '../lib/ImageSlot';
import { Nav } from './Nav';
import { LandingButton } from './LandingButton';
import { DCI_CARDS, FEATURE_ITEMS, PACKAGES, BLOG_POSTS, TESTIMONIALS, FB_URL } from './landing-data';

const wrap = 'max-w-wrap mx-auto px-7 max-[560px]:px-5';
const secPad = 'py-20 max-[560px]:py-[52px]';
const kicker = 'font-head font-bold text-[13px] tracking-[.10em] uppercase text-gold-700';
const Tick = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12.5l4.5 4.5L19 7" />
  </svg>
);
const ArrowR = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

function SecHead({ kickerText, title, sub }: { kickerText: string; title: string; sub?: string }) {
  return (
    <div className="text-center max-w-[640px] mx-auto mb-[46px] max-[560px]:mb-[30px]">
      <span className={kicker}>{kickerText}</span>
      <h2 className="font-head text-[38px] font-bold mt-3.5 text-l-ink max-[560px]:text-[27px]">{title}</h2>
      {sub && <p className="text-[16.5px] text-muted mt-3.5 max-[560px]:text-[15px]">{sub}</p>}
    </div>
  );
}

function Hero() {
  return (
    <section id="top" className="pt-16 pb-[72px] overflow-hidden max-[560px]:pt-8 max-[560px]:pb-11">
      <div className={`${wrap} grid grid-cols-[1.05fr_.95fr] gap-[54px] items-center max-[980px]:grid-cols-1 max-[980px]:gap-10`}>
        <div>
          <span className="inline-flex items-center gap-2 font-head font-bold text-[12.5px] tracking-[.08em] uppercase text-gold-700 bg-gold-tint border border-gold-soft px-3.5 py-[7px] rounded-pill">
            Learn More · Achieve More · Be Unstoppable
          </span>
          <h1 className="font-head text-[54px] font-bold mt-[22px] text-l-ink leading-[1.12] tracking-[-.02em] max-[980px]:text-[42px] max-[560px]:text-[33px]">
            Đồng hành cùng bạn trên hành trình <span className="text-gold-700 whitespace-nowrap">chinh phục giấc mơ</span>
          </h1>
          <p className="text-lg text-l-ink-2 mt-[22px] max-w-[520px] max-[560px]:text-base">
            EduNex giúp các bạn trẻ và những người phụ nữ không an phận tự tin sử dụng Tiếng Anh để phá bỏ giới hạn, khám phá bản thân và hiện thực hoá ước mơ tại New Zealand.
          </p>
          <div className="flex gap-3.5 mt-[30px] flex-wrap max-[560px]:flex-col">
            <LandingButton href="#lien-he" lg>Tư vấn miễn phí</LandingButton>
            <LandingButton href="#tieng-anh" variant="ghost" lg>Khám phá khoá Tiếng Anh</LandingButton>
          </div>
          <div className="flex gap-[26px] mt-[34px] flex-wrap max-[560px]:gap-x-5 max-[560px]:gap-y-3.5">
            {[
              { label: 'Lộ trình cá nhân hoá', d: 'M12 4 21.5 8 12 12 2.5 8z' },
              { label: 'Coaching 1:1 cùng Ms. Jane', d: 'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM5 20a7 7 0 0 1 14 0' },
              { label: 'New Zealand', d: 'M12 21s7-6 7-11a7 7 0 0 0-14 0c0 5 7 11 7 11z' },
            ].map((t) => (
              <div key={t.label} className="flex items-center gap-2.5 text-sm text-l-ink-2 font-medium">
                <span className="w-[34px] h-[34px] rounded-[10px] bg-gold-tint text-gold-700 flex items-center justify-center shrink-0">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d={t.d} />
                  </svg>
                </span>
                {t.label}
              </div>
            ))}
          </div>
        </div>
        <div className="relative max-[980px]:max-w-[440px] max-[560px]:max-w-[330px] max-[560px]:mx-auto">
          <div className="absolute -top-10 -right-[30px] w-[300px] h-[300px] rounded-full -z-10 max-[560px]:w-[220px] max-[560px]:h-[220px]" style={{ background: 'radial-gradient(circle, rgba(242,180,0,.35), transparent 70%)' }} />
          <ImageSlot id="hero-jane" src="/assets/ms-jane.png" radius={30} placeholder="Thả ảnh Ms. Jane / lớp học" alt="Ms. Jane, nhà sáng lập EduNex" className="block w-full aspect-[4/5.3] rounded-[30px] shadow-l-card border border-l-line bg-cream-2" />
          <div className="absolute -left-[22px] bottom-[34px] bg-paper border border-l-line rounded-[18px] px-[18px] py-3.5 shadow-l-card flex items-center gap-3 max-[560px]:left-2.5 max-[560px]:bottom-3.5">
            <span className="w-[42px] h-[42px] rounded-full flex items-center justify-center font-head font-extrabold text-[#23252E]" style={{ background: 'linear-gradient(145deg,#FFC93D,#D29900)' }}>J</span>
            <div>
              <div className="font-head font-bold text-[14.5px] text-l-ink">Ms. Jane</div>
              <div className="text-[12.5px] text-muted">Nhà sáng lập &amp; Coach</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Dci() {
  return (
    <section id="triet-ly" className={`bg-paper border-y border-l-line-soft ${secPad}`}>
      <div className={wrap}>
        <SecHead kickerText="Triết lý D.C.I" title="Ba giá trị dẫn lối mọi hành trình tại EduNex" sub="Chúng tôi tin mỗi người đều có thể đạt được mục tiêu của mình bằng sự kiên trì, niềm đam mê và sự đồng hành đúng cách." />
        <div className="grid grid-cols-3 gap-[22px] max-[980px]:grid-cols-1">
          {DCI_CARDS.map((c) => (
            <div key={c.letter} className="bg-cream border border-l-line rounded-[22px] px-[26px] py-[30px] shadow-l-soft">
              <div className="w-[54px] h-[54px] rounded-2xl bg-gold-tint text-gold-700 flex items-center justify-center mb-[18px]">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z" /></svg>
              </div>
              <div className="font-head font-extrabold text-[13px] tracking-[.04em] text-gold-700">{c.letter}</div>
              <h3 className="font-head text-xl font-bold mt-1.5 text-l-ink">{c.title}</h3>
              <p className="text-[14.5px] text-l-ink-2 mt-3">{c.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Feature() {
  return (
    <section id="tieng-anh" className={secPad}>
      <div className={`${wrap} grid grid-cols-[1fr_1.05fr] gap-[54px] items-center max-[980px]:grid-cols-1 max-[980px]:gap-9`}>
        <div className="relative max-[980px]:order-first">
          <ImageSlot id="english-photo" src="/assets/english-class.png" radius={26} placeholder="Thả ảnh lớp Tiếng Anh" alt="Lớp học Tiếng Anh EduNex" className="block w-full aspect-[5/4.2] rounded-[26px] border border-l-line shadow-l-card bg-cream-2" />
          <div className="absolute -right-[18px] top-7 bg-paper border border-l-line rounded-2xl px-4 py-3 shadow-l-card flex items-center gap-2.5 font-semibold text-[13.5px] text-l-ink max-[560px]:right-2.5 max-[560px]:top-3.5">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#A9760B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 5l11 7-11 7z" /></svg>
            Học online qua Zoom
          </div>
        </div>
        <div>
          <span className={kicker}>Chương trình Tiếng Anh</span>
          <h2 className="font-head text-[38px] font-bold mt-3.5 text-l-ink max-[560px]:text-[27px]">Yêu Tiếng Anh để định hình và thăng hoa với chính mình</h2>
          <p className="text-[16.5px] text-l-ink-2 mt-[18px] max-[560px]:text-[15.5px]">Với EduNex, Tiếng Anh không còn là rào cản mà trở thành người bạn đồng hành, chìa khoá để bạn tự tin giao tiếp, học tập và làm việc tại New Zealand.</p>
          <div className="grid grid-cols-2 gap-x-[22px] gap-y-3.5 mt-[26px] max-[560px]:grid-cols-1">
            {FEATURE_ITEMS.map((it) => (
              <div key={it.title} className="flex gap-3 items-start">
                <span className="w-[26px] h-[26px] rounded-lg bg-gold-tint text-gold-700 flex items-center justify-center shrink-0 mt-0.5"><Tick /></span>
                <div>
                  <b className="block font-head font-bold text-[14.5px] text-l-ink">{it.title}</b>
                  <span className="text-[13px] text-muted">{it.sub}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="flex gap-3.5 mt-[30px] flex-wrap max-[560px]:flex-col">
            <LandingButton href="#lien-he">Đăng ký học thử</LandingButton>
            <LandingButton href="#khoa-hoc" variant="ghost">Xem các gói coaching</LandingButton>
          </div>
        </div>
      </div>
    </section>
  );
}

function Founder() {
  return (
    <section id="founder" className={`bg-paper border-y border-l-line-soft ${secPad}`}>
      <div className={`${wrap} grid grid-cols-[.85fr_1.15fr] gap-[54px] items-center max-[980px]:grid-cols-1 max-[980px]:gap-[34px]`}>
        <div className="relative max-[560px]:max-w-[340px] max-[560px]:mx-auto max-[560px]:w-full">
          <ImageSlot id="founder-photo" src="/assets/ms-jane.png" radius={28} placeholder="Thả ảnh Ms. Jane" alt="Ms. Jane Trần" className="block w-full aspect-[4/5.2] rounded-[28px] border border-l-line shadow-l-card bg-cream" />
        </div>
        <div>
          <span className={kicker}>Nhà sáng lập</span>
          <div className="font-head text-[30px] font-semibold text-l-ink leading-[1.28] tracking-[-.02em] mt-4 max-[560px]:text-[23px]">
            “Tiếng Anh là chìa khoá để phá bỏ giới hạn, định hình bản thân và thăng hoa trong cuộc sống.”
          </div>
          <p className="text-base text-l-ink-2 mt-5 max-[560px]:text-[15px]">Đó là lý do Ms. Jane xây dựng EduNex, nơi cô cùng đội ngũ tận tâm đồng hành với các bạn trẻ và những người phụ nữ không đầu hàng, an phận; giúp họ tự tin dùng Tiếng Anh, khám phá tiềm năng và hiện thực hoá giấc mơ của mình.</p>
          <p className="text-base text-l-ink-2 mt-5 max-[560px]:text-[15px]">Hành trình của cô bắt đầu từ một ngôi làng nhỏ, nhưng đã thực sự lớn lên. Và giờ đây, cô mong được cùng bạn viết tiếp những câu chuyện thành công.</p>
          <div className="mt-6 flex items-center gap-[13px]">
            <span className="w-[46px] h-[46px] rounded-full flex items-center justify-center font-head font-extrabold text-[#23252E]" style={{ background: 'linear-gradient(145deg,#FFC93D,#D29900)' }}>J</span>
            <div>
              <div className="font-head font-bold text-base text-l-ink">Ms. Jane (Jane Tran)</div>
              <div className="text-[13.5px] text-muted">Nhà sáng lập EduNex · English &amp; Career Coach</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Packages() {
  return (
    <section id="khoa-hoc" className={secPad}>
      <div className={wrap}>
        <SecHead kickerText="Khoá học nổi bật" title="Coaching CV & Phỏng vấn: biến bạn thành ứng viên xuất sắc" sub="Đồng hành trực tiếp từ chuyên gia, từ lộ trình tự học đến gói VIP cam kết có việc tại New Zealand." />
        <div className="grid grid-cols-4 gap-5 items-stretch max-[980px]:grid-cols-2 max-[560px]:grid-cols-1">
          {PACKAGES.map((p) => (
            <div
              key={p.tier}
              className={`bg-paper border rounded-[22px] px-[22px] py-[26px] flex flex-col relative ${p.popular ? 'border-gold shadow-[0_2px_6px_rgba(242,180,0,.12),0_18px_40px_rgba(60,45,15,.10)]' : 'border-l-line shadow-l-soft'}`}
            >
              {p.popular && (
                <span className="absolute -top-3 left-[22px] bg-gold text-[#23252E] font-head font-bold text-[11.5px] px-3 py-[5px] rounded-pill shadow-[0_4px_12px_rgba(242,180,0,.4)]">
                  Phổ biến nhất
                </span>
              )}
              <div className="font-head font-extrabold text-xs tracking-[.10em] uppercase text-gold-700">{p.tier}</div>
              <h3 className="font-head text-[18.5px] font-bold mt-2 min-h-[50px] text-l-ink max-[560px]:min-h-0 max-[560px]:text-[18px]">{p.title}</h3>
              <div className="font-head font-extrabold text-[30px] text-l-ink mt-3">{p.price}</div>
              <div className="text-[13.5px] text-l-ink-2 mt-3 flex-1">{p.desc}</div>
              <LandingButton href="#lien-he" variant={p.variant} className="mt-5 w-full">{p.cta}</LandingButton>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Blog() {
  return (
    <section id="blog" className={`bg-paper border-y border-l-line-soft ${secPad}`}>
      <div className={wrap}>
        <SecHead kickerText="Bài viết mới" title="Câu chuyện & cảm hứng từ EduNex" />
        <div className="grid grid-cols-3 gap-[22px] max-[980px]:grid-cols-1">
          {BLOG_POSTS.map((b) => (
            <a key={b.href} href={b.href} target="_blank" rel="noopener noreferrer" className="bg-paper border border-l-line rounded-[20px] overflow-hidden shadow-l-soft transition-[transform,box-shadow] hover:-translate-y-[3px] hover:shadow-l-card flex flex-col">
              <div className="h-[158px] relative" style={{ background: 'linear-gradient(135deg,#FFF1CD,#F6EEDC)' }}>
                <span className="absolute left-3.5 bottom-3.5 bg-paper border border-l-line rounded-pill px-[11px] py-1 text-xs font-semibold text-l-ink-2">{b.date}</span>
              </div>
              <div className="px-[18px] pt-[18px] pb-5 flex flex-col gap-2.5 flex-1">
                <h3 className="font-head text-[17px] font-bold leading-[1.3] text-l-ink">{b.title}</h3>
                <span className="mt-auto font-head font-bold text-[13.5px] text-gold-700 inline-flex items-center gap-1.5">Đọc tiếp <ArrowR /></span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section className={secPad}>
      <div className={wrap}>
        <SecHead kickerText="Cảm nhận học viên" title="Khách hàng nói gì về EduNex?" />
        <div className="grid grid-cols-3 gap-[22px] max-[980px]:grid-cols-1">
          {TESTIMONIALS.map((t) => (
            <div key={t.name} className="bg-cream border border-l-line rounded-[20px] px-6 py-[26px] shadow-l-soft">
              <div className="flex gap-[3px] text-gold mb-3.5">★★★★★</div>
              <p className="text-[15px] text-l-ink-2">“{t.quote}”</p>
              <div className="flex items-center gap-3 mt-[18px]">
                <span className="w-[42px] h-[42px] rounded-full bg-gold-tint text-gold-700 flex items-center justify-center font-head font-extrabold text-[15px]">{t.short}</span>
                <div>
                  <div className="font-head font-bold text-[14.5px] text-l-ink">{t.name}</div>
                  <div className="text-[12.5px] text-muted">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <p className="text-center text-[12.5px] text-muted mt-5">Cảm nhận mang tính minh hoạ cho bản thiết kế.</p>
      </div>
    </section>
  );
}

function Cta() {
  return (
    <section id="lien-he" className={`${secPad} pt-5`}>
      <div className={wrap}>
        <div className="rounded-[30px] px-[54px] py-[58px] flex items-center gap-10 relative overflow-hidden text-white max-[980px]:flex-col max-[980px]:items-start max-[980px]:px-[30px] max-[980px]:py-10 max-[560px]:px-[22px] max-[560px]:py-8 max-[560px]:rounded-3xl" style={{ background: 'linear-gradient(150deg,#23262F,#15171C)' }}>
          <div className="absolute -top-20 -right-10 w-[320px] h-[320px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(242,180,0,.34), transparent 70%)' }} />
          <div className="relative">
            <h2 className="font-head text-white text-[36px] font-bold max-[560px]:text-[25px]">Sẵn sàng bắt đầu hành trình của bạn?</h2>
            <p className="text-white/70 text-base mt-3 max-w-[520px] max-[560px]:text-[15px]">Đặt lịch tư vấn miễn phí cùng Ms. Jane để tìm lộ trình Tiếng Anh và sự nghiệp phù hợp nhất với bạn.</p>
          </div>
          <div className="ml-auto flex flex-col gap-3 relative shrink-0 max-[980px]:ml-0 max-[980px]:w-full">
            <LandingButton href={FB_URL} target="_blank" rel="noopener noreferrer" lg>Tư vấn miễn phí</LandingButton>
            <Link to="/login" className="inline-flex items-center justify-center font-head font-semibold rounded-[14px] px-7 py-4 text-base text-white" style={{ background: 'rgba(255,255,255,.12)' }}>
              Vào app học viên
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function FooterLogo() {
  return (
    <a href="#top" className="inline-flex items-center gap-[11px]">
      <span className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: 'linear-gradient(145deg,#FFC93D,#D29900)', boxShadow: '0 3px 10px rgba(224,162,0,.34)' }}>
        <svg width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="#23252E" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><path d="M12 4 21.5 8 12 12 2.5 8z" /><path d="M6.5 10v3.2c0 1.5 2.5 2.8 5.5 2.8s5.5-1.3 5.5-2.8V10" /><path d="M21.5 8v4.2" /></svg>
      </span>
      <span className="font-head font-extrabold text-[23px] tracking-[-.02em] text-l-ink">Edu<b className="text-gold-700">Nex</b></span>
    </a>
  );
}

function Footer() {
  return (
    <footer className="bg-paper border-t border-l-line-soft pt-14 pb-[30px]">
      <div className={wrap}>
        <div className="grid grid-cols-[1.4fr_1fr_1fr_1fr] gap-[34px] max-[980px]:grid-cols-2 max-[400px]:grid-cols-1">
          <div>
            <FooterLogo />
            <p className="text-sm text-muted mt-4 max-w-[280px]">Learn More · Achieve More · Be Unstoppable. Đồng hành Tiếng Anh &amp; sự nghiệp cho người Việt tại New Zealand.</p>
          </div>
          <FootCol title="Khám phá" links={[['#triet-ly', 'Giới thiệu'], ['#tieng-anh', 'Tiếng Anh'], ['#khoa-hoc', 'CV · Phỏng vấn'], ['#blog', 'Blog']]} />
          <FootCol title="Khoá học" links={[['#khoa-hoc', 'Silver · $49'], ['#khoa-hoc', 'Gold · $199'], ['#khoa-hoc', 'Platinum · $399'], ['#khoa-hoc', 'Premium · $4,000']]} />
          <div>
            <h4 className="font-head text-[13px] font-extrabold tracking-[.08em] uppercase text-l-ink mb-3.5">Liên hệ</h4>
            <a href={FB_URL} target="_blank" rel="noopener noreferrer" className="block text-[14.5px] text-l-ink-2 py-1.5 hover:text-gold-700">Facebook Ms. Jane</a>
            <Link to="/login" className="block text-[14.5px] text-l-ink-2 py-1.5 hover:text-gold-700">Đăng nhập học viên</Link>
            <a href="#lien-he" className="block text-[14.5px] text-l-ink-2 py-1.5 hover:text-gold-700">Tư vấn miễn phí</a>
            <span className="block text-sm text-muted py-1.5">Auckland, New Zealand</span>
          </div>
        </div>
        <div className="border-t border-l-line-soft mt-10 pt-[22px] flex items-center gap-3.5 flex-wrap max-[560px]:flex-col max-[560px]:items-start">
          <span className="text-[13.5px] text-muted">Bản quyền © 2026 EduNex. Đã đăng ký bản quyền.</span>
          <div className="ml-auto flex gap-2.5 max-[560px]:ml-0">
            <a href={FB_URL} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="w-[38px] h-[38px] rounded-[11px] border border-l-line flex items-center justify-center text-l-ink-2 hover:border-gold-600 hover:text-gold-700">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M14 9h3V5h-3c-2.2 0-4 1.8-4 4v2H7v4h3v6h4v-6h3l1-4h-4V9c0-.6.4-1 1-1z" /></svg>
            </a>
            <Link to="/login" aria-label="App" className="w-[38px] h-[38px] rounded-[11px] border border-l-line flex items-center justify-center text-l-ink-2 hover:border-gold-600 hover:text-gold-700">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="3" width="16" height="18" rx="3" /><path d="M10 6h4" /></svg>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FootCol({ title, links }: { title: string; links: [string, string][] }) {
  return (
    <div>
      <h4 className="font-head text-[13px] font-extrabold tracking-[.08em] uppercase text-l-ink mb-3.5">{title}</h4>
      {links.map(([href, label]) => (
        <a key={label} href={href} className="block text-[14.5px] text-l-ink-2 py-1.5 hover:text-gold-700">{label}</a>
      ))}
    </div>
  );
}

/** EduNex Vietnamese marketing landing page (10 sections). */
export function LandingPage() {
  return (
    <div className="bg-cream text-l-ink-2 font-body leading-[1.6] [scroll-behavior:smooth]">
      <Nav />
      <main>
        <Hero />
        <Dci />
        <Feature />
        <Founder />
        <Packages />
        <Blog />
        <Testimonials />
        <Cta />
      </main>
      <Footer />
    </div>
  );
}

export default LandingPage;
