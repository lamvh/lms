/** Static content for the EduNex landing page (verbatim from the prototype). No em dash. */

export const NAV_LINKS = [
  { href: '#triet-ly', label: 'Giới thiệu' },
  { href: '#tieng-anh', label: 'Tiếng Anh' },
  { href: '#khoa-hoc', label: 'CV · Phỏng vấn' },
  { href: '#blog', label: 'Blog' },
  { href: '#lien-he', label: 'Liên hệ' },
];

export const DCI_CARDS = [
  {
    letter: 'D · Dream',
    title: 'Dream-Driven Learning',
    body: 'Chúng tôi đồng hành cùng bạn trên hành trình chinh phục giấc mơ, tin rằng mỗi người đều có thể đạt được mục tiêu thông qua sự kiên trì và niềm đam mê.',
  },
  {
    letter: 'C · Collaborate',
    title: 'Collaborative Excellence',
    body: 'Chúng tôi tin sự xuất sắc không đến từ cạnh tranh, mà từ sự hợp tác, chia sẻ và cùng nhau phát triển mỗi ngày.',
  },
  {
    letter: 'I · Inspire',
    title: 'Inspiration Through Self-Discovery',
    body: 'Mỗi hành động nhỏ trong học tập đều có thể truyền cảm hứng, giúp bạn tự tin khám phá bản thân, tìm thấy đam mê và sứ mệnh của mình.',
  },
];

export const FEATURE_ITEMS = [
  { title: 'Lộ trình cá nhân hoá', sub: 'Theo trình độ & mục tiêu riêng của bạn' },
  { title: 'Lớp 1:1 & nhóm nhỏ', sub: 'Tương tác cao, sửa lỗi trực tiếp' },
  { title: 'Tiếng Anh giao tiếp & công sở', sub: 'Ứng dụng vào học tập và đi làm' },
  { title: 'Đồng hành tận tâm', sub: 'Theo sát tiến độ qua app EduNex' },
];

export interface Package {
  tier: string;
  title: string;
  price: string;
  desc: string;
  cta: string;
  variant: 'ghost' | 'gold' | 'dark';
  popular?: boolean;
}

export const PACKAGES: Package[] = [
  { tier: 'Silver · Gói bạc', title: 'Lộ trình tìm việc tại New Zealand từ A–Z', price: '$49', desc: 'Khoá tự học hệ thống: từ viết CV đến nhận job offer, từng bước rõ ràng.', cta: 'Tìm hiểu', variant: 'ghost' },
  { tier: 'Gold · Gói vàng', title: 'Coaching 1:1 · Tăng tốc CV & Phỏng vấn', price: '$199', desc: 'Kèm 1:1 để hoàn thiện CV và luyện phỏng vấn, tự tin chinh phục nhà tuyển dụng.', cta: 'Tìm hiểu', variant: 'ghost' },
  { tier: 'Platinum · Gói bạch kim', title: 'Coaching 1:1 · Làm chủ tuyển dụng, tăng tốc về đích', price: '$399', desc: 'Đồng hành chuyên sâu suốt quá trình ứng tuyển để bạn về đích nhanh hơn.', cta: 'Đăng ký', variant: 'gold', popular: true },
  { tier: 'Premium · Gói kim cương', title: 'Chương trình đồng hành VIP · Cam kết có việc!', price: '$4,000', desc: 'Gói cao cấp nhất, đồng hành toàn diện với cam kết kết quả rõ ràng.', cta: 'Liên hệ tư vấn', variant: 'dark' },
];

export const BLOG_POSTS = [
  { href: 'https://edunex.co.nz/chi-oi-co-phai-em-dang-la-ke-that-bai-khong/', date: '24/11/2025', title: 'Chị ơi, có phải em đang là kẻ thất bại không?' },
  { href: 'https://edunex.co.nz/trong-hanh-trinh-hoc-tieng-anh-cua-toi-co-nhung-ky-niem-nao-that-dang-nho-khong/', date: '24/11/2025', title: 'Hành trình học Tiếng Anh của tôi: những kỷ niệm đáng nhớ' },
  { href: 'https://edunex.co.nz/tham-dai-hoc-sydney-top-3-tai-uc-va-25-tren-the-gioi/', date: '24/11/2025', title: 'Thăm Đại học Sydney: Top 3 tại Úc và #25 thế giới' },
];

export const TESTIMONIALS = [
  { quote: 'Mình từng rất ngại nói Tiếng Anh. Sau lộ trình cùng Ms. Jane, mình tự tin phỏng vấn và đã có việc tại Auckland.', short: 'MT', name: 'Mai T.', role: 'Học viên · Auckland' },
  { quote: 'Coaching 1:1 rất sát sao. CV của mình được lột xác hoàn toàn, nhà tuyển dụng phản hồi tích cực hẳn.', short: 'HL', name: 'Hương L.', role: 'Gói Platinum' },
  { quote: 'Điều mình quý nhất là sự đồng hành tận tâm, không chỉ dạy Tiếng Anh mà còn truyền cảm hứng để mình dám mơ lớn.', short: 'QA', name: 'Quỳnh A.', role: 'Học viên · Wellington' },
];

export const FB_URL = 'https://www.facebook.com/jane.tran1510';
