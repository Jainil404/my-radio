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
    { id: "20", title: "Machayenge 4", artist: "Desi Hip Hop", videoId: "ESWHVtbBMlM" }
  ],
  moody: [
    { id: "1", title: "Aaoge Tum Kabhi", artist: "The Local Train", videoId: "hvKaPTmQBA8" },
    { id: "2", title: "Aashiq Tera", artist: "Moody Vibes", videoId: "emh8zR4ZqZ0" },
    { id: "3", title: "Sahiba", artist: "Moody Vibes", videoId: "NW6Dgax2d6I" },
    { id: "4", title: "Zamaana Lage", artist: "Moody Vibes", videoId: "J9UmpPw521E" },
    { id: "5", title: "Manja", artist: "Moody Vibes", videoId: "6XvyKlvl31o" },
    { id: "6", title: "Mere Bina", artist: "Moody Vibes", videoId: "3chj4ooasmE" },
    { id: "7", title: "Tujhe Bhula Diya", artist: "Moody Vibes", videoId: "o-9VdyXZKsQ" },
    { id: "8", title: "Teri Yaad", artist: "Moody Vibes", videoId: "LY2zVIljGIs" },
    { id: "9", title: "Finding Her", artist: "Moody Vibes", videoId: "PZtSnQBsBW0" },
    { id: "10", title: "Pal Behta Jaaye", artist: "Vismay Patel", videoId: "HUC4bRQ4qdA" },
    { id: "11", title: "Raatein Guzaari", artist: "Moody Vibes", videoId: "nbtTb8huxWA" },
    { id: "12", title: "Zulf", artist: "Moody Vibes", videoId: "FY9THG4-spg" },
    { id: "13", title: "Phool", artist: "Moody Vibes", videoId: "9OvWPXBSuCc" },
    { id: "14", title: "Nasamajh", artist: "Moody Vibes", videoId: "jDzgpibEJPc" },
    { id: "15", title: "nadaaniyan", artist: "Moody Vibes", videoId: "EFAJcxnFLgs" },
    { id: "16", title: "Jugraafiya", artist: "Moody Vibes", videoId: "X8bu-nEmN5o" },
    { id: "17", title: "Tu Har Lamha", artist: "Moody Vibes", videoId: "0lH2MHzarGA" },
    { id: "18", title: "Masoom", artist: "Moody Vibes", videoId: "JhSmkbE4BPc" },
    { id: "19", title: "Tumhare Hi Rahenge Hum", artist: "Moody Vibes", videoId: "EV5982RVl6w" },
    { id: "20", title: "Priceless", artist: "Moody Vibes", videoId: "E-AkzEJa29c" },
    { id: "21", title: "Ishaqzaade", artist: "Moody Vibes", videoId: "DOMj__8afqg" },
    { id: "22", title: "Dil Haara", artist: "Moody Vibes", videoId: "fHUEl3TAPOo" },
    { id: "23", title: "Saiyaara", artist: "Moody Vibes", videoId: "8ZLFwzPPk7Q" },
    { id: "24", title: "Akhiyaan", artist: "Moody Vibes", videoId: "T35uru7JCIo" },
    { id: "25", title: "NISHANI", artist: "Moody Vibes", videoId: "HuCmZ1VoEQ8" },
    { id: "26", title: "DIL KAA JO HAAL HAI", artist: "Moody Vibes", videoId: "lg4R-_QWEUY" },
    { id: "27", title: "Kasturi", artist: "Moody Vibes", videoId: "OBhN_FwzFEg" },
    { id: "28", title: "Adhoora", artist: "Moody Vibes", videoId: "i39m8Lp-HsI" },
    { id: "29", title: "Rozaana", artist: "Moody Vibes", videoId: "8QfI0IwumLw" },
    { id: "30", title: "Tum Hi Ho", artist: "Moody Vibes", videoId: "fsiPzT50ZiM" },
    { id: "31", title: "Sunn Raha Hai", artist: "Moody Vibes", videoId: "lOBmToX9gr8" },
    { id: "32", title: "Chahun Main Ya Naa", artist: "Moody Vibes", videoId: "NPC-9hYbkLE" },
    { id: "33", title: "Hum Mar Jayenge", artist: "Moody Vibes", videoId: "7UmMidoCer0" },
    { id: "34", title: "Meri Aashiqui", artist: "Moody Vibes", videoId: "Des4vM1U7MA" },
    { id: "35", title: "Piya Aaye Na", artist: "Moody Vibes", videoId: "M2CZaOwOeQo" }
  ]
};

// 2. The "Vibe" Dictionary 
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
  },
  moody: {
    title: "Midnight Moody",
    bgDesktop: "/bg/moody-16.png",
    bgMobile: "/bg/moody-9.png",
    hudLocation: "18.7481° N, 73.4071° E", 
    hudLocationName: '"LONAVALA VALLEY"',
    hudTemp: "18°C",
    hudSignal: "NO SIGNAL (SOS)"
  }
};