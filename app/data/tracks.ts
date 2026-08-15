export type Track = {
  id: string;
  title: string;
  artist: string;
  videoId: string;
};

// 1. Your Playlists
export const playlists: Record<string, Track[]> = {
  bollywood: [
    { id: "1", title: "Maafi", artist: "Pritam And Pedro", videoId: "Hr5BtPkylmA" },
    { id: "2", title: "Meri Saansein", artist: "Bollywood", videoId: "V7LIAwCziUk" },
    { id: "3", title: "Maula Maula Re", artist: "Ajay Devgan", videoId: "IMlcwOK5CLI" },
    { id: "4", title: "Saathiyaa", artist: "Bollywood", videoId: "t6t3i8SBbIM" },
    { id: "5", title: "Tere Bin", artist: "Simmba", videoId: "P84DXiycs9c" },
    { id: "6", title: "Tu Hi Disda", artist: "Bhooth Bangla", videoId: "4FYKJPe0dOE" },
    { id: "7", title: "Is This Love", artist: "Bollywood", videoId: "589fbH7M1QM" },
    { id: "8", title: "Le Aaunga", artist: "Bollywood", videoId: "1ZkN7Hkda4c" },
    { id: "9", title: "Tum Se", artist: "Bollywood", videoId: "mmkaDi06C2w" },
    { id: "10", title: "Raabta", artist: "Bollywood", videoId: "piUHBTXsoiY" },
    { id: "11", title: "Channa Ve", artist: "Bollywood", videoId: "epm7tAtEvYA" },
    { id: "12", title: "Jogi", artist: "Bollywood", videoId: "D78UzqpxIQU" },
    { id: "13", title: "Dhoonde Akhiyaan", artist: "Bollywood", videoId: "552o3yppiJA" },
    { id: "14", title: "Ve Haaniyaan", artist: "Bollywood", videoId: "g3LThx6Rftw" },
    { id: "15", title: "Raanjhan", artist: "Bollywood", videoId: "7Iqe_yCYwvM" },
    { id: "16", title: "Tu Hain Toh", artist: "Mr. And Mrs. Mahi", videoId: "ohx5VxmQCmM" },
    { id: "17", title: "Ishq Sufiyana (Male)", artist: "Bollywood", videoId: "ejK-F8_NxYc" },
    { id: "18", title: "Salaam Aaya", artist: "Bollywood", videoId: "EdGU_B8UTbY" },
    { id: "19", title: "Chashni", artist: "Bharat", videoId: "jbtaWPH9bjk" },
    { id: "20", title: "Yaariyaan (Male)", artist: "Bollywood", videoId: "wjX57G5qATE" },
    { id: "21", title: "DARKHAAST", artist: "Bollywood", videoId: "-3vUz7QPljM" },
    { id: "22", title: "Haareya", artist: "Bollywood", videoId: "C14askJ1tO8" }
  ],
  desiHipHop: [
    { id: "1", title: "Knock Knock", artist: "Desi Hip Hop", videoId: "BvqqY8_vPXE" },
    { id: "2", title: "Kohinoor", artist: "Desi Hip Hop", videoId: "HZYz6qzs1jU" },
    { id: "3", title: "Cigarette", artist: "Desi Hip Hop", videoId: "D7AsgqDVVxU" },
    { id: "4", title: "DEHSHAT HO", artist: "Desi Hip Hop", videoId: "iedQY_Eq1qo" },
    { id: "5", title: "Millionaire", artist: "Desi Hip Hop", videoId: "yleXPEPJIgI" },
    { id: "6", title: "Victory Anthem", artist: "Desi Hip Hop", videoId: "oyt4Ms7mj_o" },
    { id: "7", title: "Raat Ki Rani", artist: "Desi Hip Hop", videoId: "RlMrQvSMnhQ" },
    { id: "8", title: "Sensitive", artist: "Desi Hip Hop", videoId: "RSVLgzDqQ5Y" },
    { id: "9", title: "Khatta Flow", artist: "Desi Hip Hop", videoId: "IBkT4Yww7zk" },
    { id: "10", title: "11K", artist: "Desi Hip Hop", videoId: "nUAra7tddLY" },
    { id: "11", title: "Pahiye", artist: "Desi Hip Hop", videoId: "0ga1VIRQSEc" },
    { id: "12", title: "Silvatein", artist: "Desi Hip Hop", videoId: "eC3OoU8r1bg" },
    { id: "13", title: "Shikayat", artist: "Desi Hip Hop", videoId: "7IpOlGos6Bs" },
    { id: "14", title: "Oochiyat", artist: "Desi Hip Hop", videoId: "6r6vQajbTcQ" },
    { id: "15", title: "Joota Japani", artist: "Desi Hip Hop", videoId: "b_yJHwFlBvo" },
    { id: "16", title: "TRAP PRAA", artist: "Desi Hip Hop", videoId: "Vq68hYSvMiw" },
    { id: "17", title: "No Cap", artist: "Desi Hip Hop", videoId: "6Zv9mSiZGBU" },
    { id: "18", title: "Hona Hi Tha", artist: "Desi Hip Hop", videoId: "r2Rw9AaoTcI" },
    { id: "19", title: "Woh Raat", artist: "Desi Hip Hop", videoId: "_vj17OLdpek" },
    { id: "20", title: "Machayenge 4", artist: "Desi Hip Hop", videoId: "ESWHVtbBMlM" },
    { id: "21", title: "No Mercy (Bonus Track)", artist: "Desi Hip Hop", videoId: "KqTq67Ukof4" },
    { id: "22", title: "3:59 AM", artist: "Desi Hip Hop", videoId: "HmW1wIhyCng" },
    { id: "23", title: "Makasam", artist: "Desi Hip Hop", videoId: "fSwe7XoAi2g" },
    { id: "24", title: "Untitled", artist: "Desi Hip Hop", videoId: "kAm1rTxIvG0" },
    { id: "25", title: "Baazigar", artist: "Desi Hip Hop", videoId: "Afh-9qQYDEk" },
    { id: "26", title: "Seedha Makeover", artist: "Desi Hip Hop", videoId: "so0XDycD48w" },
    { id: "27", title: "Baap Se", artist: "Desi Hip Hop", videoId: "RdEz7VqZnvE" },
    { id: "28", title: "Maharani", artist: "Desi Hip Hop", videoId: "2JdQMlC43eo" },
    { id: "29", title: "OK Report", artist: "Desi Hip Hop", videoId: "nwVy-A5hszU" },
    { id: "30", title: "Teesri Manzil", artist: "Desi Hip Hop", videoId: "QDH6RL3R_gs" },
    { id: "31", title: "JASHAN-E-HIP-HOP", artist: "Desi Hip Hop", videoId: "AtWkwaCvrHU" },
    { id: "32", title: "Parinda", artist: "Desi Hip Hop", videoId: "zEi6YEq16ms" },
    { id: "33", title: "Mere Bina", artist: "Desi Hip Hop", videoId: "GDKO4Q72yxw" },
    { id: "34", title: "Satya", artist: "Desi Hip Hop", videoId: "PTUXeIZ2Pqw" },
    { id: "35", title: "Haath Varthi", artist: "Desi Hip Hop", videoId: "Qe4W3ZWlTtE" }
  ]
};

// 2. The "Vibe" Dictionary (This controls the instant swap!)
export const genreDetails: Record<string, any> = {
  bollywood: {
    title: "Mountain's Choice",
    bgDesktop: "/bg/scene-wide.png", 
    bgMobile: "/bg/scene-tall.png",
    hudLocation: "34.1526° N, 77.5771° E",
    hudLocationName: '"MAGGI POINT - 1.2KM"',
    hudTemp: "4°C",
    hudSignal: "WEAK (H+)"
  },
  desiHipHop: {
    title: "Street Hip Hop",
    bgDesktop: "/bg/street-16.png",
    bgMobile: "/bg/street-9.png",
    hudLocation: "19.0760° N, 72.8777° E", 
    hudLocationName: '"GULLY GANG SEC"',
    hudTemp: "32°C",
    hudSignal: "STRONG (5G)"
  }
};