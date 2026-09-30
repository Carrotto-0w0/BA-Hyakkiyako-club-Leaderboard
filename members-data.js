/* =====================================================
   HYAKKIYAKO CLUB — MEMBER DATA

   ไฟล์นี้แยกออกมาต่างหาก เพื่อให้แก้ไข "รูปสมาชิก"
   หรือเพิ่ม/แก้ "Info" ได้ง่าย โดยไม่ต้องไปยุ่งกับ
   script.js เลย

   วิธีแก้ไข:
   - image      = ชื่อไฟล์รูปหลัก (โชว์ตลอด) อยู่ในโฟลเดอร์ members/
   - imageAlt   = (ใช้เฉพาะ Leader / Manager) รูปที่จะโชว์
                  แทนตอนกดปุ่ม "i" เพื่อดู Info
                  ถ้าไม่มีรูปที่ 2 ให้ปล่อยเป็น "" ไว้
   - info       = ข้อความ Info ใต้ชื่อ (กดปุ่ม "i" เพื่อดู)
                  ถ้ายังไม่มี Info ให้ใส่ "" ไว้ก่อน
                  (ระบบจะไม่โชว์ปุ่ม "i" ให้อัตโนมัติ)

   เพิ่มสมาชิกใหม่: copy ทั้งก้อน { ... } แล้ววางต่อท้าย
   ใน clubMembers array ด้านล่าง พร้อมเปลี่ยนชื่อ/ไฟล์รูป
===================================================== */

const clubLeader = {
    name: "Nahima",
    image: "members/Nahima1.png",
    imageAlt: "members/Nahima2.png",
    info: "Our hardworking and extraordinary club leader — yet so adorable when teased."
};


const clubManagers = [

    {
        name: "Carrot",
        image: "members/Carrot1.png",
        imageAlt: "members/Carrot2.png",
        info: "Supa-slacc manager, F2P, and admires Nahima a lot."
    },

    {
        name: "Serene",
        image: "members/Serene1.png",
        imageAlt: "members/Serene2.png",
        info: "Nahima's right-hand man, highly reliable raids consultant."
    }

];


const clubMembers = [

    {
        name: "Yayus",
        image: "members/Yayus.png",
        imageAlt: "",
        info: "Mighty Raid Fighter."
    },

    {
        name: "Polygon",
        image: "members/Polygon.png",
        imageAlt: "",
        info: "Raids consultant, strong Raid Fighter."
    },

    {
        name: "Velloz",
        image: "members/Velloz.png",
        imageAlt: "",
        info: "Strong Raid Fighter."
    },

    {
        name: "Yura",
        image: "members/Yura.png",
        imageAlt: "",
        info: "Strong Raid Fighter."
    },

    {
        name: "Fui",
        image: "members/Fui.png",
        imageAlt: "",
        info: "Top streak Izuna dabber."
    },

    {
        name: "Relax",
        image: "members/Relax.png",
        imageAlt: "",
        info: "Raid Fighter."
    },

    {
        name: "Mthanh",
        image: "members/Mthanh.png",
        imageAlt: "",
        info: "Club Pianist."
    },

    {
        name: "雨息",
        image: "members/雨息.png",
        imageAlt: "",
        info: "Raid Fighter."
    },

    {
        name: "Demonnarto",
        image: "members/Demonnarto.png",
        imageAlt: "",
        info: "The elite and all mighty Raid Fighter of the club. Competitive hard carry, and owner of a barbershop who only knows the bald haircut. Can finish the raid blindfolded — only bad gacha can limit his unlimited power."
    },

    {
        name: "NW2M",
        image: "members/NW2M.png",
        imageAlt: "",
        info: ""
    },

    {
        name: "Messi",
        image: "members/Messi.png",
        imageAlt: "",
        info: ""
    },

    {
        name: "Foxsnow",
        image: "members/Foxsnow.png",
        imageAlt: "",
        info: ""
    },

    {
        name: "Keen",
        image: "members/Keen.png",
        imageAlt: "",
        info: ""
    },

    {
        name: "Domtood",
        image: "members/Domtood.png",
        imageAlt: "",
        info: ""
    },

    {
        name: "Geeao",
        image: "members/Geeao.png",
        imageAlt: "",
        info: ""
    },

    {
        name: "Rui",
        image: "members/Rui.png",
        imageAlt: "",
        info: ""
    },

    {
        name: "Vannesith",
        image: "members/Vannesith.png",
        imageAlt: "",
        info: ""
    },

    {
        name: "Derain",
        image: "members/Derain.png",
        imageAlt: "",
        info: ""
    },

    {
        name: "Xyren",
        image: "members/Xyren.png",
        imageAlt: "",
        info: ""
    },

    {
        name: "Helheim",
        image: "members/Helheim.png",
        imageAlt: "",
        info: ""
    },

    {
        name: "SkyRish",
        image: "members/SkyRish.png",
        imageAlt: "",
        info: ""
    },

    {
        name: "Jakala",
        image: "members/Jakala.png",
        imageAlt: "",
        info: ""
    },

    {
        name: "EmptyCup",
        image: "members/EmptyCup.png",
        imageAlt: "",
        info: ""
    },

    {
        name: "Chainzer",
        image: "members/Chainzer.png",
        imageAlt: "",
        info: ""
    },

    {
        name: "Astra",
        image: "members/Astra.png",
        imageAlt: "",
        info: ""
    },

    {
        name: "DiPa",
        image: "members/DiPa.png",
        imageAlt: "",
        info: ""
    },

    {
        name: "Nero",
        image: "members/Nero.png",
        imageAlt: "",
        info: ""
    },

    {
        name: "Nezunanda",
        image: "members/Nezunanda.png",
        imageAlt: "",
        info: ""
    },

    {
        name: "UnclePom",
        image: "members/UnclePom.png",
        imageAlt: "",
        info: ""
    },

    {
        name: "Kondee",
        image: "members/Kondee.png",
        imageAlt: "",
        info: ""
    },

    {
        name: "WhoTao",
        image: "members/WhoTao.png",
        imageAlt: "",
        info: ""
    },

    {
        name: "Fournier",
        image: "members/Fournier.png",
        imageAlt: "",
        info: ""
    },

    {
        name: "Ayaya",
        image: "members/Ayaya.png",
        imageAlt: "",
        info: ""
    },

    {
        name: "Kargvee",
        image: "members/Kargvee.png",
        imageAlt: "",
        info: ""
    },

    {
        name: "JustCasual",
        image: "members/JustCasual.png",
        imageAlt: "",
        info: ""
    },

    {
        name: "DedeMiku",
        image: "members/DedeMiku.png",
        imageAlt: "",
        info: ""
    }

];
