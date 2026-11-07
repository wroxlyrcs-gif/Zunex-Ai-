(function (root, factory) {
  var kb = factory();
  if (typeof module === "object" && module.exports) module.exports = kb;
  else root.ZunexKB = kb;
})(typeof self !== "undefined" ? self : this, function () {
  "use strict";
  // Anahtarlar ASCII ve küçük harf. "!" öneki güçlü anahtar (tek başına yeter).
  var KB = {
    capitals: {
      "turkiye": ["Türkiye", "Ankara"], "almanya": ["Almanya", "Berlin"], "fransa": ["Fransa", "Paris"],
      "italya": ["İtalya", "Roma"], "ispanya": ["İspanya", "Madrid"], "ingiltere": ["İngiltere", "Londra"],
      "birlesik krallik": ["Birleşik Krallık", "Londra"], "portekiz": ["Portekiz", "Lizbon"],
      "yunanistan": ["Yunanistan", "Atina"], "bulgaristan": ["Bulgaristan", "Sofya"], "romanya": ["Romanya", "Bükreş"],
      "rusya": ["Rusya", "Moskova"], "ukrayna": ["Ukrayna", "Kiev (Kyiv)"], "polonya": ["Polonya", "Varşova"],
      "hollanda": ["Hollanda", "Amsterdam (hükümet merkezi Lahey)"], "belcika": ["Belçika", "Brüksel"],
      "isvec": ["İsveç", "Stokholm"], "norvec": ["Norveç", "Oslo"], "finlandiya": ["Finlandiya", "Helsinki"],
      "danimarka": ["Danimarka", "Kopenhag"], "isvicre": ["İsviçre", "Bern"], "avusturya": ["Avusturya", "Viyana"],
      "macaristan": ["Macaristan", "Budapeşte"], "cekya": ["Çekya", "Prag"], "abd": ["ABD", "Washington D.C."],
      "amerika": ["ABD", "Washington D.C."], "kanada": ["Kanada", "Ottawa"], "meksika": ["Meksika", "Meksiko (Mexico City)"],
      "brezilya": ["Brezilya", "Brasília"], "arjantin": ["Arjantin", "Buenos Aires"], "sili": ["Şili", "Santiago"],
      "japonya": ["Japonya", "Tokyo"], "cin": ["Çin", "Pekin"], "hindistan": ["Hindistan", "Yeni Delhi"],
      "guney kore": ["Güney Kore", "Seul"], "kuzey kore": ["Kuzey Kore", "Pyongyang"], "azerbaycan": ["Azerbaycan", "Bakü"],
      "gurcistan": ["Gürcistan", "Tiflis"], "ermenistan": ["Ermenistan", "Erivan"], "iran": ["İran", "Tahran"],
      "irak": ["Irak", "Bağdat"], "suriye": ["Suriye", "Şam"], "misir": ["Mısır", "Kahire"],
      "suudi arabistan": ["Suudi Arabistan", "Riyad"], "avustralya": ["Avustralya", "Canberra"],
      "yeni zelanda": ["Yeni Zelanda", "Wellington"], "nijerya": ["Nijerya", "Abuja"], "kenya": ["Kenya", "Nairobi"],
      "pakistan": ["Pakistan", "İslamabad"], "kazakistan": ["Kazakistan", "Astana"], "ozbekistan": ["Özbekistan", "Taşkent"]
    },
    facts: [
      { t: "Azerbaycan tarihi (genel bakış)", k: ["!azerbaycan tarih", "!azerbaycan tarix", "!history of azerbaijan", "!azerbaijan history", "!история азербайджан", "!azerbaycanin tarix", "!azerbaycan in tarih"], a: {
        tr: "Azerbaycan tarihi: MÖ 4. yy’da Atropatena ve Kafkas Arnavutluğu; 7. yy’da Arap fethi, ardından İslamlaşma; 861–1538 Şirvanşahlar Devleti; 11. yy’da Selçuklular, 12. yy’da Atabeyler (Eldenizler) ve Nizami Gencevi’nin dönemi; 1501’de Şah İsmail’in Tebriz’de Safevi devletini kurması. 1813 Gülistan ve 1828 Türkmençay antlaşmalarıyla kuzey kısmı Rusya’ya geçti. 28 Mayıs 1918’de Azerbaycan Halk Cumhuriyeti (Doğu’da ilk parlamenter cumhuriyet) kuruldu; 28 Nisan 1920’de Sovyet yönetimi başladı; 18 Ekim 1991’de bağımsızlık yeniden ilan edildi. Detay için “Azerbaycan Sovyet dönemi”, “Karabağ”, “Haydar Aliyev” veya “Şirvanşahlar” yaz.",
        az: "Azərbaycan tarixi: e.ə. IV əsrdə Atropatena və Qafqaz Albaniyası; VII əsrdə ərəb fəthi və islamın yayılması; 861–1538 Şirvanşahlar dövləti; XI əsrdə səlcuqlar, XII əsrdə Eldəgizlər və Nizami Gəncəvinin dövrü; 1501-də Şah İsmayılın Təbrizdə Səfəvilər dövlətini qurması. 1813 Gülüstan və 1828 Türkmənçay müqavilələri ilə şimal hissə Rusiyaya keçdi. 28 may 1918-də Azərbaycan Xalq Cümhuriyyəti (Şərqdə ilk parlamentli respublika) yarandı; 28 aprel 1920-də sovet hakimiyyəti başladı; 18 oktyabr 1991-də müstəqillik bərpa olundu.",
        en: "History of Azerbaijan: Atropatene and Caucasian Albania (4th c. BC); Arab conquest and Islamisation (7th c.); the Shirvanshahs (861–1538); Seljuks (11th c.) and Eldiguzids (12th c.), the era of the poet Nizami Ganjavi; Shah Ismail I founded the Safavid state in Tabriz in 1501. The treaties of Gulistan (1813) and Turkmenchay (1828) placed the north under Russia. The Azerbaijan Democratic Republic (the first parliamentary republic in the Muslim East) was founded on 28 May 1918; Soviet rule began on 28 April 1920; independence was restored on 18 October 1991.",
        ru: "История Азербайджана: Атропатена и Кавказская Албания (IV в. до н. э.); арабское завоевание и исламизация (VII в.); государство Ширваншахов (861–1538); сельджуки (XI в.), Эльдегизиды (XII в.), эпоха Низами Гянджеви; в 1501 г. Шах Исмаил I основал в Тебризе государство Сефевидов. По Гюлистанскому (1813) и Туркманчайскому (1828) договорам север отошёл к России. 28 мая 1918 г. создана Азербайджанская Демократическая Республика; 28 апреля 1920 г. началась советская власть; 18 октября 1991 г. восстановлена независимость." } },
      { t: "Azerbaycan: Sovyet dönemi, bağımsızlık, Karabağ", k: ["!azerbaycan sovyet", "!sovet", "!azerbaycan bagimsizlik", "!azerbaijan independence", "!soviet azerbaijan", "!karabag", "!qarabag", "!karabakh", "!haydar aliyev", "!heydar aliyev", "!ilham aliyev"], a: {
        tr: "Azerbaycan SSC 1920–1991 arasında SSCB’nin parçasıydı. 20 Ocak 1990’da (Kara Ocak) Sovyet ordusu Bakü’ye girdi. 18 Ekim 1991’de bağımsızlık ilan edildi. 1988–1994 Karabağ savaşı 12 Mayıs 1994’te ateşkesle durdu. Haydar Aliyev (1923–2003) 1993–2003’te cumhurbaşkanıydı; 2003’ten beri İlham Aliyev cumhurbaşkanıdır. 27 Eylül–10 Kasım 2020 İkinci Karabağ Savaşı üçlü bildiriyle sona erdi; Eylül 2023’te Azerbaycan bölgede kontrolü tamamladı. Güncel gelişmeleri bilmiyorum, güvenilir haber kaynaklarına bak.",
        az: "Azərbaycan SSR 1920–1991-ci illərdə SSRİ-nin tərkibində idi. 20 yanvar 1990-da (Qara Yanvar) sovet ordusu Bakıya daxil oldu. 18 oktyabr 1991-də müstəqillik elan edildi. 1988–1994 Qarabağ müharibəsi 12 may 1994-də atəşkəslə dayandı. Heydər Əliyev (1923–2003) 1993–2003-də prezident idi; 2003-dən İlham Əliyev prezidentdir. 27 sentyabr–10 noyabr 2020 İkinci Qarabağ müharibəsi üçtərəfli bəyanatla bitdi; 2023-cü ilin sentyabrında Azərbaycan bölgədə nəzarəti tamamladı.",
        en: "The Azerbaijan SSR was part of the USSR from 1920 to 1991. On 20 January 1990 (Black January) Soviet troops entered Baku. Independence was declared on 18 October 1991. The 1988–1994 Karabakh war ended with a ceasefire on 12 May 1994. Heydar Aliyev (1923–2003) was president in 1993–2003; Ilham Aliyev has been president since 2003. The Second Karabakh War (27 Sep–10 Nov 2020) ended with a trilateral statement; in September 2023 Azerbaijan completed control of the region. I have no live news, so check reliable sources for recent developments." } },
      { t: "Şirvanşahlar ve Atropatena", k: ["!sirvansah", "!shirvanshah", "!ширваншах", "!atropaten", "!kafkas arnavut", "!caucasian albania", "!qafqaz albaniya"], a: {
        tr: "Atropatena (MÖ 4. yy), Kuzey İran’daki Güney Azerbaycan’da kurulan devlettir; Kafkas Arnavutluğu ise Kür nehrinin kuzeyindeki kadim devlettir. Şirvanşahlar (861–1538) Şamahı ve sonra Bakü merkezli devlettir; Bakü’deki Şirvanşahlar Sarayı bu dönemden kalmadır.",
        az: "Atropatena (e.ə. IV əsr) Cənubi Azərbaycanda yaranan dövlətdir; Qafqaz Albaniyası isə Kür çayından şimaldakı qədim dövlətdir. Şirvanşahlar (861–1538) əvvəlcə Şamaxı, sonra Bakı mərkəzli dövlətdir; Bakıdakı Şirvanşahlar Sarayı bu dövrdən qalıb.",
        en: "Atropatene (4th c. BC) arose in what is now Iranian Azerbaijan, while Caucasian Albania lay north of the Kura river. The Shirvanshahs (861–1538) ruled from Shamakhi and later Baku; the Palace of the Shirvanshahs in Baku dates from this era." } },
      { t: "Dünya saatleri ve saat dilimleri", k: ["!saat dilimi", "!saat kusagi", "!saat qursagi", "!time zone", "!timezone", "!utc", "!gmt", "!часовой пояс", "!часовые пояса", "!tarih cizgisi", "!date line"], a: {
        tr: "Dünya 24 ana saat dilimine bölünür; saatler UTC (eşgüdümlü evrensel zaman) üzerinden +/- farkla hesaplanır. Bakü UTC+4, Türkiye UTC+3, Moskova UTC+3, Londra UTC+0 (yazın +1), Tokyo UTC+9, New York UTC−5 (yazın −4). Gün değişim çizgisi Pasifik’te yaklaşık 180° boylamındadır. Bazı ülkelerde yaz saati uygulaması vardır; Azerbaycan 2016’dan beri uygulamaz. Bir şehrin saatini sor: “Tokyo’da saat kaç?” ya da “dünya saatleri”.",
        az: "Dünya 24 əsas saat qurşağına bölünür; saatlar UTC-yə görə +/- fərqlə hesablanır. Bakı UTC+4, Türkiyə UTC+3, Moskva UTC+3, London UTC+0 (yayda +1), Tokio UTC+9, Nyu-York UTC−5 (yayda −4). Tarix xətti Sakit okeanda təxminən 180° uzunluqdadır. Azərbaycan 2016-dan yay vaxtına keçmir. Şəhər soruş: “Tokioda saat neçədir?”",
        en: "The world is split into 24 main time zones, each an offset from UTC. Baku is UTC+4, Türkiye UTC+3, Moscow UTC+3, London UTC+0 (+1 in summer), Tokyo UTC+9, New York UTC−5 (−4 in summer). The International Date Line runs near 180° longitude in the Pacific. Azerbaijan has not used daylight saving time since 2016. Ask: “What time is it in Tokyo?” or “world clocks”.",
        ru: "Мир делится на 24 основных часовых пояса относительно UTC. Баку — UTC+4, Турция — UTC+3, Москва — UTC+3, Лондон — UTC+0 (летом +1), Токио — UTC+9, Нью-Йорк — UTC−5 (летом −4). Линия перемены дат проходит около 180° в Тихом океане. Азербайджан не переходит на летнее время с 2016 года. Спроси: «Который час в Токио?»" } },
      { t: "Atatürk", k: ["!ataturk", "!mustafa kemal"], a: "Mustafa Kemal Atatürk, 1881’de Selanik’te doğdu ve 10 Kasım 1938’de İstanbul’da vefat etti. Türkiye Cumhuriyeti’nin kurucusu ve ilk cumhurbaşkanıdır." },
      { t: "Cumhuriyet’in ilanı", k: ["!cumhuriyet"], a: "Türkiye Cumhuriyeti 29 Ekim 1923’te ilan edildi. İlk cumhurbaşkanı Mustafa Kemal Atatürk oldu." },
      { t: "İstanbul’un fethi", k: ["!fetih", "!fatih"], a: "İstanbul, 29 Mayıs 1453’te Osmanlı Sultanı II. Mehmed (Fatih Sultan Mehmed) tarafından fethedildi." },
      { t: "Işık hızı", k: ["!isik hizi", "!isigin hizi"], a: "Işığın boşluktaki hızı saniyede yaklaşık 299.792 km’dir (kabaca 300.000 km/sn)." },
      { t: "Işık yılı", k: ["!isik yili"], a: "Işık yılı bir süre değil, mesafe birimidir: ışığın bir yılda aldığı yol, yaklaşık 9,46 trilyon km." },
      { t: "Dünya–Güneş mesafesi", k: ["gunes", "uzak", "mesafe", "dunya"], a: "Dünya ile Güneş arasındaki ortalama mesafe yaklaşık 150 milyon km’dir (1 astronomik birim)." },
      { t: "Güneş Sistemi’nin gezegenleri", k: ["!gezegen", "!gunes sistemi"], a: "Güneş Sistemi’nde 8 gezegen vardır: Merkür, Venüs, Dünya, Mars, Jüpiter, Satürn, Uranüs ve Neptün. En büyüğü Jüpiter’dir." },
      { t: "Ay", k: ["!uydu", "!ay uydusu"], a: "Dünya’nın tek doğal uydusu Ay’dır; Dünya’ya ortalama yaklaşık 384.400 km uzaktadır." },
      { t: "Kıtalar", k: ["!kita"], a: "Yaygın modele göre 7 kıta vardır: Asya, Afrika, Kuzey Amerika, Güney Amerika, Antarktika, Avrupa ve Avustralya (Okyanusya)." },
      { t: "Okyanuslar", k: ["!okyanus"], a: "5 okyanus vardır: Pasifik (en büyüğü), Atlas, Hint, Güney ve Arktik (Kuzey Buz) Okyanusu." },
      { t: "Everest Dağı", k: ["!everest"], a: "Everest Dağı, deniz seviyesinden yaklaşık 8.849 m yüksekliğiyle dünyanın en yüksek zirvesidir." },
      { t: "Suyun kaynama ve donma noktası", k: ["!kaynama", "!kaynar", "!donma"], a: "Su, deniz seviyesinde 100 °C’de kaynar ve 0 °C’de donar. Yükseldikçe kaynama noktası düşer." },
      { t: "Fotosentez", k: ["!fotosentez"], a: "Fotosentez, bitkilerin ve bazı canlıların ışık enerjisiyle su ve karbondioksitten glikoz üretip oksijen açığa çıkarmasıdır." },
      { t: "DNA", k: ["!dna"], a: "DNA, canlıların kalıtsal bilgisini taşıyan çift sarmallı moleküldür; bilgi A, T, G ve C adlı dört bazın dizilimiyle kodlanır." },
      { t: "Yer çekimi", k: ["!yer cekimi", "!yercekimi"], a: "Dünya yüzeyinde yer çekimi ivmesi yaklaşık 9,81 m/s²’dir. Newton’un evrensel çekim yasasına göre kütleli cisimler birbirini çeker." },
      { t: "Pisagor teoremi", k: ["!pisagor"], a: "Dik üçgende dik kenarların kareleri toplamı hipotenüsün karesine eşittir: a² + b² = c²." },
      { t: "Asal sayılar", k: ["!asal"], a: "Asal sayı, yalnızca 1’e ve kendisine bölünebilen, 1’den büyük doğal sayıdır (2, 3, 5, 7, 11…). Bir sayıyı sorabilirsin: “29 asal mı?”" },
      { t: "Pi sayısı", k: ["!pi sayi"], a: "Pi (π), bir çemberin çevresinin çapına oranıdır: yaklaşık 3,14159265. İrrasyoneldir, yani ondalık gösterimi sonsuza dek tekrarsız sürer." },
      { t: "Fibonacci dizisi", k: ["!fibonacci"], a: "Fibonacci dizisinde her sayı önceki ikisinin toplamıdır: 0, 1, 1, 2, 3, 5, 8, 13, 21…" },
      { t: "Artık yıl", k: ["!artik yil"], a: "Artık yıl 366 gün sürer (Şubat 29 çeker) ve genelde 4’e bölünen yıllardır. İstisna: 100’e bölünen yıllar, 400’e de bölünmedikçe artık değildir." },
      { t: "Türk alfabesi", k: ["!alfabe"], a: "Türk alfabesi 29 harften oluşur: 8 ünlü ve 21 ünsüz." },
      { t: "İnsan iskeleti", k: ["!kemik"], a: "Yetişkin bir insanda 206 kemik bulunur." },
      { t: "Bit ve bayt", k: ["!bayt", "!byte", "!bit"], a: "1 bayt = 8 bittir. Geleneksel olarak 1 KB = 1024 bayt, 1 MB = 1024 KB’dir." },
      { t: "Yapay zekâ", k: ["!yapay zeka"], a: "Yapay zekâ, bilgisayarların öğrenme, çıkarım ve dil anlama gibi insan zekâsıyla ilişkilendirilen işleri yapmasını sağlayan yöntemlerin genel adıdır. Ben bunlardan biri değilim: kural ve bilgi tabanı temelli, tarayıcında çalışan basit bir asistanım." },
      { t: "HTML", k: ["!html"], a: "HTML, web sayfalarının yapısını (başlık, paragraf, bağlantı, görsel vb.) tanımlayan işaretleme dilidir." },
      { t: "CSS", k: ["!css"], a: "CSS, HTML ile yazılmış sayfaların renk, yerleşim ve yazı tipi gibi görünümünü belirleyen stil dilidir." },
      { t: "JavaScript", k: ["!javascript"], a: "JavaScript, web sayfalarına etkileşim kazandıran programlama dilidir; tarayıcıda çalışır." },
      { t: "Python", k: ["!python"], a: "Python, okunaklı söz dizimiyle bilinen genel amaçlı bir programlama dilidir; veri analizi, otomasyon ve web geliştirmede yaygındır." },
      { t: "GitHub Pages", k: ["!github"], a: "GitHub Pages, GitHub depolarındaki statik siteleri (HTML, CSS, JS) ücretsiz yayınlayan bir hizmettir." }
    ]
  };
  function C(keys, arr) { keys.split("|").forEach(function (k) { KB.capitals[k] = arr; }); }
  // [trÜlke, trŞehir, enÜlke, enCity, ruСтрана, ruГород, azÖlkə, azŞəhər]
  C("azerbaycan|azerbaijan|азербайджан", ["Azerbaycan","Bakü","Azerbaijan","Baku","Азербайджан","Баку","Azərbaycan","Bakı"]);
  C("turkiye|turkey|турци", ["Türkiye","Ankara","Turkey","Ankara","Турция","Анкара","Türkiyə","Ankara"]);
  C("almanya|germany|almaniya|герман", ["Almanya","Berlin","Germany","Berlin","Германия","Берлин","Almaniya","Berlin"]);
  C("fransa|france|франци", ["Fransa","Paris","France","Paris","Франция","Париж","Fransa","Paris"]);
  C("japonya|japan|yaponiya|япони", ["Japonya","Tokyo","Japan","Tokyo","Япония","Токио","Yaponiya","Tokio"]);
  C("rusya|russia|rusiya|росси", ["Rusya","Moskova","Russia","Moscow","Россия","Москва","Rusiya","Moskva"]);
  C("italya|italy|italiya|итали", ["İtalya","Roma","Italy","Rome","Италия","Рим","İtaliya","Roma"]);
  C("ispanya|spain|ispaniya|испани", ["İspanya","Madrid","Spain","Madrid","Испания","Мадрид","İspaniya","Madrid"]);
  C("abd|usa|united states|сша", ["ABD","Washington D.C.","United States","Washington, D.C.","США","Вашингтон","ABŞ","Vaşinqton"]);
  C("ingiltere|united kingdom|england|britain|великобритани|britaniya", ["İngiltere","Londra","United Kingdom","London","Великобритания","Лондон","Böyük Britaniya","London"]);
  function F(t, k, tr, az, en, ru) { KB.facts.push({ t: t, k: k, a: { tr: tr, az: az, en: en, ru: ru } }); }
  F("Azerbaycan Halk Cumhuriyeti", ["!azerbaycan xalq cumhuriyyeti", "!azerbaycan halk cumhuriyeti", "!azerbaijan democratic republic", "!adr", "!азербайджанская демократическая"],
    "Azerbaycan Halk Cumhuriyeti 28 Mayıs 1918’de kuruldu; Doğu’nun Müslüman toplumlarında ilk demokratik cumhuriyettir. Nisan 1920’de Sovyet işgaliyle sona erdi.",
    "Azərbaycan Xalq Cümhuriyyəti 28 may 1918-ci ildə yaranıb; Şərqdə ilk demokratik respublikadır. 1920-ci ilin aprelində Sovet işğalı ilə süqut edib.",
    "The Azerbaijan Democratic Republic was founded on 28 May 1918 and was the first democratic republic in the Muslim East. It ended with the Soviet takeover in April 1920.",
    "Азербайджанская Демократическая Республика была провозглашена 28 мая 1918 года — первая демократическая республика на мусульманском Востоке. Пала в апреле 1920 года после советского вторжения.");
  F("Osmanlı Devleti", ["!osmanli", "!ottoman", "!османск"],
    "Osmanlı Devleti yaklaşık 1299’da Osman Bey tarafından kuruldu. 1453’te İstanbul’u fethetti; saltanat 1 Kasım 1922’de kaldırıldı, Türkiye Cumhuriyeti 29 Ekim 1923’te ilan edildi.",
    "Osmanlı dövləti təxminən 1299-cu ildə Osman bəy tərəfindən qurulub. 1453-də İstanbulu fəth edib; sultanlıq 1 noyabr 1922-də ləğv olunub, Türkiyə Cümhuriyyəti 29 oktyabr 1923-də elan edilib.",
    "The Ottoman state was founded around 1299 by Osman I. It conquered Constantinople in 1453; the sultanate was abolished on 1 November 1922 and the Republic of Türkiye was proclaimed on 29 October 1923.",
    "Османское государство основано около 1299 года Осман-беем. В 1453 году оно взяло Константинополь; султанат упразднён 1 ноября 1922 года, а Турецкая Республика провозглашена 29 октября 1923 года.");
  F("İkinci Dünya Savaşı", ["!ikinci dunya", "!world war 2", "!world war ii", "!second world war", "!вторая мировая", "!ww2"],
    "İkinci Dünya Savaşı 1 Eylül 1939’da Almanya’nın Polonya’ya saldırısıyla başladı; Avrupa’da 8 Mayıs 1945’te, Japonya’nın teslimiyle 2 Eylül 1945’te sona erdi.",
    "İkinci Dünya müharibəsi 1939-cu il sentyabrın 1-də Almaniyanın Polşaya hücumu ilə başlayıb; Avropada 8 may 1945-də, Yaponiyanın təslimi ilə 2 sentyabr 1945-də başa çatıb.",
    "World War II began on 1 September 1939 with Germany's invasion of Poland; it ended in Europe on 8 May 1945 and fully on 2 September 1945 with Japan's surrender.",
    "Вторая мировая война началась 1 сентября 1939 года нападением Германии на Польшу; в Европе закончилась 8 мая 1945 года, полностью — 2 сентября 1945 года капитуляцией Японии.");
  F("Suyun formülü", ["!suyun formulu", "!suyun kimyasal", "!formula of water", "!water formula", "!chemical formula of water", "!формула воды"],
    "Suyun kimyasal formülü H₂O’dur: 2 hidrojen ve 1 oksijen atomu.",
    "Suyun kimyəvi formulu H₂O-dur: 2 hidrogen və 1 oksigen atomu.",
    "The chemical formula of water is H₂O: 2 hydrogen atoms and 1 oxygen atom.",
    "Химическая формула воды — H₂O: 2 атома водорода и 1 атом кислорода.");
  F("Futbol", ["!futbol", "!football", "!футбол"],
    "Futbol: her takım sahada 11 oyuncuyla oynar, maç 2×45 dakikadır. İlk FIFA Dünya Kupası 1930’da Uruguay’da oynandı.",
    "Futbol: hər komanda meydanda 11 oyunçu ilə oynayır, oyun 2×45 dəqiqədir. İlk FIFA Dünya Kuboku 1930-cu ildə Uruqvayda keçirilib.",
    "Football (soccer): each team plays with 11 players, and a match lasts 2×45 minutes. The first FIFA World Cup was held in Uruguay in 1930.",
    "Футбол: каждая команда играет в составе 11 игроков, матч длится 2×45 минут. Первый чемпионат мира ФИФА прошёл в 1930 году в Уругвае.");
  F("Gezegenler", ["!planet", "!планет"],
    "Güneş Sistemi’nde 8 gezegen vardır: Merkür, Venüs, Dünya, Mars, Jüpiter, Satürn, Uranüs, Neptün.",
    "Günəş sistemində 8 planet var: Merkuri, Venera, Yer, Mars, Yupiter, Saturn, Uran, Neptun.",
    "The Solar System has 8 planets: Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune.",
    "В Солнечной системе 8 планет: Меркурий, Венера, Земля, Марс, Юпитер, Сатурн, Уран, Нептун.");
  F("Nizami Gencevi", ["!nizami", "!низами"],
    "Nizami Gencevi (yaklaşık 1141–1209), Gence doğumlu büyük Azerbaycan şairidir; en ünlü eseri beş destandan oluşan “Hamse”dir.",
    "Nizami Gəncəvi (təxminən 1141–1209) Gəncədə doğulmuş böyük Azərbaycan şairidir; ən məşhur əsəri beş poemadan ibarət “Xəmsə”dir.",
    "Nizami Ganjavi (c. 1141–1209) was a great poet from Ganja, Azerbaijan; his best-known work is the “Khamsa”, a set of five long poems.",
    "Низами Гянджеви (ок. 1141–1209) — великий поэт из Гянджи (Азербайджан); самое известное его произведение — «Хамсе» («Пятерица»), цикл из пяти поэм.");
  F("Safeviler", ["!safevi", "!sefevi", "!safavid", "!сефевид", "!sah ismail", "!sah ismayil", "!shah ismail", "!shah ismael", "!шах исмаил", "!caldiran", "!chaldiran", "!чалдыран"],
    "Safeviler (Safevi Devleti), 1501’de Şah İsmail’in Tebriz’de tahta çıkmasıyla kuruldu; Erdebil’deki Safevi tarikatına dayanır. On iki imam Şiiliği devlet dini oldu. Osmanlı’ya 1514’te Çaldıran’da yenildi. En parlak dönemi Şah Abbas (1588–1629) devrindedir; başkent İsfahan’dı. Devlet 1736’da Nadir Şah’ın yönetimi ele almasıyla sona erdi. Şah İsmail, “Hatayî” mahlasıyla Azerbaycan Türkçesiyle şiirler yazdı.",
    "Səfəvilər dövləti 1501-ci ildə Şah İsmayılın Təbrizdə taxta çıxması ilə yaranıb; Ərdəbildəki Səfəvi təriqətinə əsaslanır. On iki imam şiəliyi dövlət dini olub. 1514-cü ildə Çaldıranda Osmanlıya məğlub olub. Ən parlaq dövrü Şah Abbas (1588–1629) zamanıdır; paytaxt İsfahan idi. Dövlət 1736-cı ildə Nadir şahın hakimiyyəti ələ almasıyla sona çatıb. Şah İsmayıl “Xətai” təxəllüsü ilə Azərbaycan türkcəsində şeirlər yazıb.",
    "The Safavid state was founded in 1501 when Shah Ismail I was crowned in Tabriz; it grew out of the Safavid order of Ardabil. Twelver Shi'ism became the state religion. It lost to the Ottomans at Chaldiran in 1514. Its peak came under Shah Abbas I (1588–1629), with Isfahan as capital. It ended in 1736 when Nader Shah took power. Ismail wrote poetry in Azerbaijani Turkic under the pen name Khatai.",
    "Государство Сефевидов возникло в 1501 году, когда Шах Исмаил I был коронован в Тебризе; оно выросло из суфийского ордена Сефевийя в Ардебиле. Государственной религией стал двунадесятнический шиизм. В 1514 году Сефевиды проиграли османам при Чалдыране. Расцвет пришёлся на правление Шаха Аббаса I (1588–1629), столица — Исфахан. Государство пало в 1736 году, когда власть взял Надир-шах. Исмаил писал стихи на азербайджанском тюркском под псевдонимом Хатаи.");
  var HW = ["tarih", "history", "tarix", "истори"];
  function H(t, c, tr, az, en, ru) { F(t, c.concat(HW), tr, az, en, ru); }
  H("Avrupa tarihi", ["avrupa", "europe", "avropa", "европ"],
    "Avrupa tarihi kısaca: Antik Yunan ve Roma → Orta Çağ (476’dan sonra) → Rönesans ve Reform (1517) → Fransız Devrimi (1789) → 19. yüzyılda ulus devletlerin doğuşu → iki dünya savaşı → 1957’den itibaren Avrupa bütünleşmesi. Tek tek devletler için “Almanya tarihi”, “Fransa tarihi” gibi sorabilirsin.",
    "Avropa tarixi qısaca: Antik Yunan və Roma → Orta əsrlər (476-dan sonra) → İntibah və Reformasiya (1517) → Fransa inqilabı (1789) → XIX əsrdə milli dövlətlərin yaranması → iki dünya müharibəsi → 1957-dən Avropa inteqrasiyası. Ayrı-ayrı dövlətlər üçün “Almaniya tarixi”, “Fransa tarixi” kimi soruşa bilərsən.",
    "European history in brief: ancient Greece and Rome → the Middle Ages (after 476) → Renaissance and Reformation (1517) → the French Revolution (1789) → nation-states in the 19th century → two world wars → European integration from 1957. You can ask about single states, e.g. “history of Germany”.",
    "История Европы кратко: Древняя Греция и Рим → Средневековье (после 476 года) → Возрождение и Реформация (1517) → Французская революция (1789) → национальные государства в XIX веке → две мировые войны → европейская интеграция с 1957 года. Можно спросить о конкретной стране, например «история Германии».");
  H("Almanya", ["almanya", "germany", "almaniya", "герман"],
    "Almanya 18 Ocak 1871’de Prusya önderliğinde (Bismarck) birleşti. II. Dünya Savaşı’ndan sonra 1949’da Batı ve Doğu Almanya olarak ikiye ayrıldı; 3 Ekim 1990’da yeniden birleşti.",
    "Almaniya 18 yanvar 1871-ci ildə Prussiyanın rəhbərliyi ilə (Bismark) birləşdi. İkinci Dünya müharibəsindən sonra 1949-da Qərbi və Şərqi Almaniyaya bölündü; 3 oktyabr 1990-da yenidən birləşdi.",
    "Germany was unified on 18 January 1871 under Prussian leadership (Bismarck). After World War II it split into West and East Germany in 1949 and was reunified on 3 October 1990.",
    "Германия была объединена 18 января 1871 года под руководством Пруссии (Бисмарк). После Второй мировой войны в 1949 году она разделилась на ФРГ и ГДР, а 3 октября 1990 года вновь объединилась.");
  H("Fransa", ["fransa", "france", "франци"],
    "Fransa’da 1789 Devrimi monarşiyi yıktı; Napolyon 1804’te imparator oldu ve 1815’te Waterloo’da kesin yenilgiye uğradı. Bugünkü Beşinci Cumhuriyet 1958’de kuruldu.",
    "Fransada 1789-cu il inqilabı monarxiyanı devirdi; Napoleon 1804-də imperator oldu və 1815-də Vaterloda qəti məğlub oldu. Hazırkı Beşinci Respublika 1958-də qurulub.",
    "In France the 1789 Revolution overthrew the monarchy; Napoleon became emperor in 1804 and was finally defeated at Waterloo in 1815. The current Fifth Republic dates from 1958.",
    "Во Франции революция 1789 года свергла монархию; Наполеон стал императором в 1804 году и был окончательно разбит при Ватерлоо в 1815 году. Нынешняя Пятая республика основана в 1958 году.");
  H("Birleşik Krallık", ["ingiltere", "britain", "england", "britaniya", "великобритани", "birlesik krallik", "united kingdom"],
    "Magna Carta 1215’te imzalandı. İngiltere ve İskoçya 1707’de Büyük Britanya Krallığı’nda birleşti; 1801’de İrlanda’yla Birleşik Krallık kuruldu. İrlanda’nın büyük kısmı 1922’de ayrıldı.",
    "Magna Karta 1215-ci ildə imzalanıb. İngiltərə və Şotlandiya 1707-də Böyük Britaniya Krallığında birləşib; 1801-də İrlandiya ilə Birləşmiş Krallıq yaranıb. İrlandiyanın böyük hissəsi 1922-də ayrılıb.",
    "Magna Carta was sealed in 1215. England and Scotland united as the Kingdom of Great Britain in 1707; the United Kingdom with Ireland was formed in 1801. Most of Ireland left in 1922.",
    "Великая хартия вольностей подписана в 1215 году. Англия и Шотландия объединились в Королевство Великобритания в 1707 году; в 1801 году с Ирландией образовано Соединённое Королевство. Большая часть Ирландии вышла из его состава в 1922 году.");
  H("İtalya", ["italya", "italy", "italiya", "итали"],
    "İtalya Krallığı 1861’de ilan edildi; Roma 1871’de başkent oldu. 1946 referandumuyla monarşi kaldırılıp cumhuriyete geçildi.",
    "İtaliya Krallığı 1861-ci ildə elan edildi; Roma 1871-də paytaxt oldu. 1946-cı il referendumu ilə monarxiya ləğv edilib respublikaya keçildi.",
    "The Kingdom of Italy was proclaimed in 1861 and Rome became the capital in 1871. A 1946 referendum abolished the monarchy and made Italy a republic.",
    "Королевство Италия было провозглашено в 1861 году, Рим стал столицей в 1871 году. Референдум 1946 года упразднил монархию и сделал Италию республикой.");
  H("İspanya", ["ispanya", "spain", "ispaniya", "испани"],
    "Granada’nın düşmesiyle 1492’de Reconquista tamamlandı; aynı yıl Kolomb Amerika’ya ulaştı. İspanya 1936–1939 iç savaşını yaşadı; Franco 1975’te öldü ve ülke demokrasiye geçti.",
    "Qranadanın süqutu ilə 1492-ci ildə Rekonkista başa çatdı; həmin il Kolumb Amerikaya çatdı. İspaniya 1936–1939-cu illərdə vətəndaş müharibəsi yaşadı; Franko 1975-də öldü və ölkə demokratiyaya keçdi.",
    "The Reconquista ended with the fall of Granada in 1492, the year Columbus reached the Americas. Spain had a civil war in 1936–1939; Franco died in 1975 and the country turned to democracy.",
    "Реконкиста завершилась падением Гранады в 1492 году — в год, когда Колумб достиг Америки. В Испании шла гражданская война 1936–1939 годов; Франко умер в 1975 году, и страна перешла к демократии.");
  H("Rusya", ["rusya", "russia", "rusiya", "росси"],
    "Rusya’nın kökeni 9. yüzyıl Kiev Rusu’na dayanır. I. Petro 1721’de imparatorluğu ilan etti. 1917 devrimlerinin ardından 1922’de SSCB kuruldu ve 1991’de dağıldı.",
    "Rusiyanın mənşəyi IX əsr Kiyev Rusuna əsaslanır. I Pyotr 1721-də imperiyanı elan etdi. 1917-ci il inqilablarından sonra 1922-də SSRİ yaradıldı və 1991-də dağıldı.",
    "Russia's roots lie in Kievan Rus' of the 9th century. Peter I proclaimed the empire in 1721. After the 1917 revolutions the USSR was formed in 1922 and dissolved in 1991.",
    "Истоки России — в Киевской Руси IX века. Пётр I провозгласил империю в 1721 году. После революций 1917 года в 1922 году образован СССР, распавшийся в 1991 году.");
  F("Roma İmparatorluğu ve Bizans", ["!roma imparatorlugu", "!roma imperiyasi", "!roman empire", "!римская импери", "!bizans", "!byzantine", "!византи"],
    "Roma İmparatorluğu MÖ 27’de Augustus ile kuruldu. Batı Roma 476’da çöktü; Doğu Roma (Bizans) 1453’te İstanbul’un Osmanlı’ya geçmesine kadar sürdü.",
    "Roma imperiyası e.ə. 27-ci ildə Avqustla qurulub. Qərbi Roma 476-cı ildə süqut edib; Şərqi Roma (Bizans) 1453-də İstanbulun Osmanlı tərəfindən fəthinə qədər davam edib.",
    "The Roman Empire began in 27 BC under Augustus. The Western Empire fell in 476; the Eastern (Byzantine) Empire lasted until Constantinople fell to the Ottomans in 1453.",
    "Римская империя возникла в 27 году до н. э. при Августе. Западная империя пала в 476 году; Восточная (Византия) просуществовала до взятия Константинополя османами в 1453 году.");
  F("Kutsal Roma-Germen İmparatorluğu", ["!kutsal roma", "!muqeddes roma", "!holy roman", "!священная римская"],
    "Kutsal Roma-Germen İmparatorluğu, I. Otto’nun 962’de taç giymesiyle başlatılır (Şarlman 800’de imparator ilan edilmişti). 1806’da Napolyon savaşları sırasında sona erdi.",
    "Müqəddəs Roma imperiyasının başlanğıcı I Ottonun 962-ci ildə tac qoymağı sayılır (Karl 800-cü ildə imperator elan edilmişdi). 1806-cı ildə Napoleon müharibələri dövründə sona çatdı.",
    "The Holy Roman Empire is usually dated from Otto I's coronation in 962 (Charlemagne had been crowned emperor in 800). It ended in 1806 during the Napoleonic Wars.",
    "Священная Римская империя ведёт отсчёт от коронации Оттона I в 962 году (Карл Великий был коронован в 800 году). Она прекратила существование в 1806 году во время наполеоновских войн.");
  F("Birinci Dünya Savaşı", ["!birinci dunya", "!world war 1", "!first world war", "!ww1", "!первая мировая"],
    "Birinci Dünya Savaşı 28 Haziran 1914’teki Saraybosna suikastından sonra başladı; 11 Kasım 1918 ateşkesiyle sona erdi. Savaş yıllarında ve hemen sonrasında Alman, Rus, Avusturya-Macaristan ve Osmanlı imparatorlukları sona erdi.",
    "Birinci Dünya müharibəsi 28 iyun 1914-cü il Sarayevo sui-qəsdindən sonra başlayıb; 11 noyabr 1918-də barışıqla bitib. Müharibə illərində və dərhal sonra Alman, Rusiya, Avstriya-Macarıstan və Osmanlı imperiyaları sona çatıb.",
    "World War I began after the Sarajevo assassination on 28 June 1914 and ended with the armistice of 11 November 1918. The German, Russian, Austro-Hungarian and Ottoman empires ended during or just after the war.",
    "Первая мировая война началась после убийства в Сараево 28 июня 1914 года и закончилась перемирием 11 ноября 1918 года. Во время войны и сразу после неё прекратили существование Германская, Российская, Австро-Венгерская и Османская империи.");
  F("Avrupa Birliği", ["!avrupa birligi", "!avropa ittifaqi", "!european union", "!европейский союз"],
    "Avrupa Ekonomik Topluluğu 1957 Roma Antlaşması’yla kuruldu (1958’de yürürlüğe girdi). Avrupa Birliği adı Maastricht Antlaşması’yla 1993’te doğdu; euro 2002’de banknot ve madeni para olarak dolaşıma girdi.",
    "Avropa İqtisadi Birliyi 1957-ci il Roma müqaviləsi ilə yaradılıb (1958-də qüvvəyə minib). Avropa İttifaqı adı 1993-cü ildə Maastrixt müqaviləsi ilə yaranıb; avro 2002-ci ildə nağd dövriyyəyə çıxıb.",
    "The European Economic Community was founded by the 1957 Treaty of Rome (in force in 1958). The name European Union came with the Maastricht Treaty in 1993; euro notes and coins entered circulation in 2002.",
    "Европейское экономическое сообщество создано Римским договором 1957 года (вступил в силу в 1958 году). Название «Европейский союз» появилось с Маастрихтским договором в 1993 году; банкноты и монеты евро поступили в обращение в 2002 году.");
  F("Pisagor teoremi", ["!pifaqor", "!pythagor", "!пифагор"],
    "Dik üçgende dik kenarların kareleri toplamı hipotenüsün karesine eşittir: a² + b² = c².",
    "Düzbucaqlı üçbucaqda katetlərin kvadratlarının cəmi hipotenuzun kvadratına bərabərdir: a² + b² = c².",
    "In a right triangle, the squares of the two legs add up to the square of the hypotenuse: a² + b² = c².",
    "В прямоугольном треугольнике сумма квадратов катетов равна квадрату гипотенузы: a² + b² = c².");
  F("Üçgenin iç açıları", ["!ucgenin ic acilar", "!ucbucagin daxili", "!angles of a triangle", "!sum of angles", "!сумма углов"],
    "Bir üçgenin iç açıları toplamı her zaman 180°’dir.", "Üçbucağın daxili bucaqlarının cəmi həmişə 180°-dir.", "The interior angles of a triangle always add up to 180°.", "Сумма внутренних углов треугольника всегда равна 180°.");
  F("Pi sayısı", ["!pi ededi", "!value of pi", "!what is pi", "!число пи", "!чему равно пи"],
    "Pi (π), çemberin çevresinin çapına oranıdır: yaklaşık 3,14159265.", "Pi (π) çevrənin uzunluğunun diametrə nisbətidir: təxminən 3,14159265.", "Pi (π) is the ratio of a circle's circumference to its diameter: about 3.14159265.", "Число π — отношение длины окружности к диаметру: примерно 3,14159265.");
  F("Kesir", ["!kesir", "!kesr", "!fraction", "!дроб"],
    "Kesir, bir bütünün eşit parçalarından kaçının alındığını gösterir: payda bütünün kaç parçaya bölündüğünü, pay kaç parça alındığını verir. Örnek: 3/4. “1/2 + 1/3” yazarak toplayabilirsin.",
    "Kəsr bütövün bərabər hissələrindən neçəsinin götürüldüyünü göstərir: məxrəc bütövün neçə hissəyə bölündüyünü, surət neçə hissə götürüldüyünü verir. Məsələn: 3/4. “1/2 + 1/3” yaza bilərsən.",
    "A fraction shows how many equal parts of a whole are taken: the denominator is the number of equal parts, the numerator is how many are taken. Example: 3/4. Try “1/2 + 1/3”.",
    "Дробь показывает, сколько равных частей целого взято: знаменатель — на сколько частей разделено целое, числитель — сколько частей взято. Пример: 3/4. Попробуй «1/2 + 1/3».");
  F("Denklem", ["!denklem", "!tenlik", "!equation", "!уравнен"],
    "Denklem, içinde bilinmeyen bulunan eşitliktir (örn. 2x + 5 = 15). Çözmek, eşitliği sağlayan değeri bulmaktır. Bana “2x+5=15” yazabilirsin.",
    "Tənlik içində məchul olan bərabərlikdir (məs. 2x + 5 = 15). Həll etmək bərabərliyi ödəyən qiyməti tapmaqdır. Mənə “2x+5=15” yaza bilərsən.",
    "An equation is an equality containing an unknown (e.g. 2x + 5 = 15). Solving it means finding the value that makes it true. Try “2x+5=15”.",
    "Уравнение — это равенство с неизвестным (например, 2x + 5 = 15). Решить его — значит найти значение, при котором оно верно. Попробуй «2x+5=15».");
  F("Türev", ["!turev", "!toreme", "!derivative", "!производн"],
    "Türev, bir fonksiyonun bir noktadaki anlık değişim hızıdır; grafikte o noktadaki teğetin eğimidir. Örnek: x² fonksiyonunun türevi 2x’tir. (Ben türev hesaplayamam, yalnızca tanımını verebilirim.)",
    "Törəmə funksiyanın bir nöqtədəki ani dəyişmə sürətidir; qrafikdə həmin nöqtədəki toxunanın bucaq əmsalıdır. Məsələn: x² funksiyasının törəməsi 2x-dir. (Mən törəmə hesablaya bilmirəm, yalnız tərifini verə bilərəm.)",
    "A derivative is the instantaneous rate of change of a function at a point; on a graph it is the slope of the tangent there. Example: the derivative of x² is 2x. (I can't compute derivatives, only give the definition.)",
    "Производная — это мгновенная скорость изменения функции в точке; на графике это угловой коэффициент касательной. Пример: производная x² равна 2x. (Я не умею вычислять производные, могу дать только определение.)");
  return KB;
});
