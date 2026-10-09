export type Outfit = {
  id: string;
  type: string;
  title: string;
  era: string;
  desc: string;
  remix: string[];
  color: string;
  trim: string;
  flare: number;
  length: number;
  vibe: string;
  history: string;
  prompt: string;
};

export const OUTFITS: Outfit[] = [
  {
    id: "ao-tac",
    type: "Áo Tấc",
    title: "Áo Tấc Gấm Hoa Chu Sa Quyền Quý",
    era: "Thời Nguyễn Cung Đình",
    desc: "Tay áo rộng thụng, vạt dài chấm gót, gấm đỏ chu sa thêu hoa văn mây vàng — toát lên vẻ đoan trang, quyền quý chốn cung đình.",
    remix: ["Kiềng bạc chạm hoa văn", "Túi cầm tay lụa tơ tằm", "Giày mũi vuông đính ngọc trai"],
    color: "#a8261b",
    trim: "#e9c46a",
    flare: 1.25,
    length: 2.6,
    vibe: "Bạn bước đi chậm rãi, khoan thai; tay áo rộng tạo nên dáng vẻ uy nghi nhưng vẫn mềm mại. Hợp chụp ở thềm đá, cổng thành cổ.",
    history:
      "Áo Tấc (áo lễ) là trang phục trang trọng của triều Nguyễn, dùng trong lễ tế, triều hội. Tay áo rộng tới cả thước, càng rộng càng thể hiện địa vị. Màu đỏ chu sa tượng trưng cho may mắn và quyền uy.",
    prompt:
      "a Vietnamese Nguyen-dynasty Áo Tấc ceremonial robe: vermilion red brocade, very wide flowing sleeves, floor-length panels, golden cloud embroidery, mandarin collar, worn over white silk trousers",
  },
  {
    id: "tu-than",
    type: "Áo Tứ Thân",
    title: "Áo Tứ Thân Kinh Bắc Phong Nhã",
    era: "Bắc Bộ cổ truyền",
    desc: "Bốn vạt áo nâu non buông nhẹ, yếm thắm cam san hô, thắt lưng bao lụa — duyên dáng, mộc mạc mà say lòng.",
    remix: ["Nón quai thao mini đeo chéo", "Boot da đen cổ thấp", "Khuyên tai bạc giọt nước"],
    color: "#7a4a2b",
    trim: "#ef8354",
    flare: 1.05,
    length: 2.3,
    vibe: "Phong thái tươi tắn, hồn hậu như cô gái quan họ. Hợp tạo dáng bên giếng làng, cây đa, mái đình rêu phong.",
    history:
      "Áo Tứ Thân gồm bốn vạt: hai vạt sau may liền, hai vạt trước buông tự do hoặc buộc lại. Gắn liền với phụ nữ Kinh Bắc và dân ca Quan họ — được UNESCO ghi danh năm 2009.",
    prompt:
      "a Vietnamese Northern Áo Tứ Thân four-panel dress: earthy brown outer panels, coral orange yếm bodice, silk sash belt tied at waist, black flowing skirt",
  },
  {
    id: "ngu-than",
    type: "Áo Ngũ Thân tay chẽn",
    title: "Áo Ngũ Thân Tay Chẽn Hoàng Triều",
    era: "Thế kỷ XVIII – XIX",
    desc: "Năm vạt áo vàng hoàng yến, tay chẽn ôm gọn, cổ đứng thanh thoát — vừa cổ kính vừa dễ mặc dạo phố mỗi ngày.",
    remix: ["Quần ống suông denim đen", "Sneaker trắng tối giản", "Vòng ngọc bích bản mảnh"],
    color: "#d9a520",
    trim: "#a8261b",
    flare: 0.85,
    length: 2.4,
    vibe: "Gọn gàng, tự tin và hiện đại. Bạn có thể diện đi cafe, dạo phố cổ hay chụp lookbook street-style.",
    history:
      "Áo Ngũ Thân có năm vạt — bốn vạt tượng trưng cho tứ thân phụ mẫu, vạt thứ năm nhỏ nằm dưới tượng trưng cho người mặc. Năm khuy áo ứng với Nhân, Lễ, Nghĩa, Trí, Tín.",
    prompt:
      "a Vietnamese Áo Ngũ Thân Tay Chẽn: canary golden-yellow silk five-panel long tunic, fitted narrow sleeves, high standing collar, five buttons, vermilion trim, worn with loose trousers",
  },
  {
    id: "nhat-binh",
    type: "Áo Nhật Bình",
    title: "Nhật Bình Hồng Ngọc",
    era: "Cảm hứng cổ phục Huế",
    desc: "Áo dáng rộng với cổ chữ nhật, sắc hồng ngọc và viền thêu nổi bật; phối cùng quần lụa sáng màu.",
    remix: ["Mấn đồng màu", "Quạt giấy", "Guốc mộc"],
    color: "#b93c63",
    trim: "#e9c46a",
    flare: 1.3,
    length: 2.6,
    vibe: "Dáng đứng nhẹ nhàng, tay giữ quạt trước eo; phù hợp bộ ảnh trang trọng giữa sân vườn hoặc kiến trúc cổ.",
    history:
      "Điểm nhận diện của áo Nhật Bình là phần cổ áo có dạng chữ nhật. Bản phối này lấy cảm hứng từ cổ phục, không phải phục dựng lễ phục nguyên bản.",
    prompt:
      "a Vietnamese Nhat Binh robe in ruby pink silk, rectangular embroidered collar, broad sleeves, long loose panels, gold decorative borders, white silk trousers",
  },
  {
    id: "ngu-than-chung",
    type: "Áo Ngũ Thân tay chùng",
    title: "Ngũ Thân Xanh Ngọc Tay Chùng",
    era: "Cảm hứng truyền thống",
    desc: "Thân áo xanh ngọc buông dài, cổ đứng và tay rộng mềm mại; quần lụa trắng làm tổng thể thanh thoát.",
    remix: ["Mấn xanh ngọc", "Guốc mộc", "Quạt giấy"],
    color: "#317e75",
    trim: "#e9c46a",
    flare: 1.2,
    length: 2.5,
    vibe: "Khoan thai và mềm mại; tay áo rộng tạo chuyển động đẹp khi bước đi hoặc nâng quạt.",
    history:
      "Áo ngũ thân có thể được biến tấu theo độ rộng tay áo. Bản tay chùng ở đây nhấn vào nét rủ rộng thay vì ôm sát cánh tay.",
    prompt:
      "a Vietnamese five-panel Ngu Than robe in jade green silk, wide flowing sleeves, standing collar, five traditional buttons, ankle-length panels, ivory silk trousers",
  },
  {
    id: "giao-linh",
    type: "Áo Giao Lĩnh",
    title: "Giao Lĩnh Lam Khói",
    era: "Cảm hứng cổ phục Việt",
    desc: "Cổ áo giao chéo, vạt lam khói và đai lụa gọn ở eo, tạo nét phóng khoáng mà vẫn mềm mại.",
    remix: ["Đai lụa", "Quạt giấy", "Giày vải"],
    color: "#527caa",
    trim: "#ccd5dd",
    flare: 1.15,
    length: 2.5,
    vibe: "Thư thái, tự nhiên; phối lớp nhẹ và để vạt áo chuyển động khi bước đi.",
    history:
      "Giao lĩnh chỉ kiểu cổ áo giao chéo phía trước. Các bản phối ở đây là gợi ý thời trang lấy cảm hứng từ phom cổ phục.",
    prompt:
      "a Vietnamese Giao Linh crossed-collar robe in smoky blue silk, overlapping diagonal lapels, broad sleeves, long flowing panels, silk waist sash, ivory loose trousers",
  },
  {
    id: "ao-dai",
    type: "Áo Dài tân thời",
    title: "Áo Dài Trắng Ngà Tân Thời",
    era: "Cảm hứng đương đại",
    desc: "Áo dài trắng ngà, tay gọn và hai tà mềm, phối quần suông hoặc denim cho những dịp dạo phố.",
    remix: ["Sneaker", "Túi nhỏ", "Khuyên tai ngọc trai"],
    color: "#e6dfce",
    trim: "#317e75",
    flare: 0.75,
    length: 2.5,
    vibe: "Tươi tắn và linh hoạt; giữ phụ kiện nhẹ để hai tà áo là điểm nhấn.",
    history:
      "Áo dài tân thời kết hợp phom áo dài với lựa chọn chất liệu và phụ kiện hiện đại. Phối denim hoặc sneaker là biến tấu thời trang, không phải lễ phục.",
    prompt:
      "a modern Vietnamese ao dai in ivory silk, fitted long-sleeve tunic, standing collar, two long panels and high side slits, jade details, flowing trousers",
  },
];

export const PROVERBS = [
  "Người đẹp vì lụa, lúa tốt vì phân.",
  "Ăn cho mình, mặc cho người.",
  "Tốt gỗ hơn tốt nước sơn.",
  "Một nét chữ, một nét duyên.",
  "Gấm vóc ai dệt, lụa là ai thêu.",
];

export const LANDMARKS = [
  {
    id: "ho-guom",
    name: "Hồ Gươm",
    place: "Hà Nội",
    scene: "beside Hoan Kiem Lake with the red Thê Húc bridge",
  },
  {
    id: "hoi-an",
    name: "Phố Cổ Hội An",
    place: "Quảng Nam",
    scene: "in Hoi An ancient town with yellow walls and silk lanterns at dusk",
  },
  {
    id: "ha-long",
    name: "Vịnh Hạ Long",
    place: "Quảng Ninh",
    scene: "on a viewpoint above Ha Long Bay limestone islands",
  },
  {
    id: "hue",
    name: "Đại Nội Huế",
    place: "Thừa Thiên Huế",
    scene: "in front of the Hue Imperial Citadel gate",
  },
];
