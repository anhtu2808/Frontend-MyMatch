# Hướng dẫn tùy chỉnh cho Copilot – MyMatch

Chúng tôi đang xây dựng **MyMatch**, nền tảng web cho sinh viên review giảng viên và đổi chéo lớp. Khi GitHub Copilot gợi ý hoặc xem xét mã nguồn trong repo này, hãy tuân thủ các quy tắc sau:

---

## 1. Tech Stack
- **Framework & Bundler**:  
  - React ^19.1.0  
  - Vite (dev server & build)  
- **UI Components**:  
  - Ant Design ^5  
  - Headless UI  
  - Heroicons  
- **State Management**:  
  - Redux Toolkit + React-Redux  
- **Routing**:  
  - React Router DOM  
- **Styling**:  
  - Tailwind CSS (với cấu hình tùy chỉnh)  
  - Biến CSS cho palette màu  
- **HTTP Client**:  
  - Axios  
- **Lint & QA**:  
  - ESLint (với config riêng của dự án)

---

## 2. Hệ thống thiết kế (Design System)
- **Màu sắc** (bắt buộc sử dụng biến CSS hoặc cấu hình Tailwind; không hard-code hex khác):  
  - Primary: `#155BC8`  
  - Primary Hover: `#1247A3`  
  - White: `#FFFFFF`  
  - Black: `#000000`  
  - Accent: `#293241`  
- **Font**:  
  - Chính: `Inter` (weights 400, 500, 700)  
  - Fallback: `sans-serif`  
- **Thiết kế tối giản (Minimalist)**:  
  - Dùng tối đa 4–5 màu, ưu tiên khoảng trắng (grid 8px–32px)  
  - Bố cục đơn giản, chỉ hiển thị thành phần khi cần thiết  
  - Loại bỏ chi tiết thừa, giữ đúng yếu tố cốt lõi  
  - Không dùng shadow sâu; bo góc nhẹ (8px–16px)  

---

## 3. Clean Code
- Viết **functional components** và dùng **React Hooks**  
- Tách riêng phần UI (JSX) và logic (custom hooks hoặc Redux slices)  
- Áp dụng nguyên tắc DRY: trừu xuất UI tái sử dụng thành component chung  
- Không dùng inline-style; chỉ sử dụng Tailwind classes hoặc biến CSS  
- Tuân thủ quy tắc ESLint (dấu ngoặc kép, dấu chấm phẩy, thụt lề, v.v.)

---

## 4. Responsive & Mobile-First
- Xây dựng theo mobile-first với breakpoints của Tailwind (`sm`, `md`, `lg`)  
- Đảm bảo navbar, bảng, thẻ, form … đều hiển thị tốt trên mọi kích thước màn hình  
- Sử dụng các pattern có sẵn (ARIA labels, focus states) để đảm bảo tính khả dụng  

---

Khi Copilot tạo bất kỳ đoạn code, file hoặc snippet nào, hãy áp dụng đầy đủ các tiêu chí trên để mọi gợi ý của Copilot luôn khớp với quy chuẩn, giao diện và trải nghiệm người dùng của MyMatch.  
