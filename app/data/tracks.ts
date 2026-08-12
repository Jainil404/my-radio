export type Track = {
  id: string;
  title: string;
  artist: string;
  videoId: string;
};

export const playlists: Record<string, Track[]> = {
  bollywood: [
    { id: "1", title: "Maafi", artist: "Pritam And Pedro", videoId: "Hr5BtPkylmA" },
    { id: "2", title: "Meri Saansein", artist: "Bollywood", videoId: "V7LIAwCziUk" },
    { id: "3", title: "Maula Maula Re", artist: "Ajay Devgan, Kajal Aggarwal", videoId: "IMlcwOK5CLI" },
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
  ]
};