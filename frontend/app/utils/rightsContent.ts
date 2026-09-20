export const getLocalizedRightsContent = (lang: string, country: string) => {
  // English
  const en = {
    ET: {
      categories: [
        { title: 'Domestic Violence', icon: 'i-heroicons-home', description: 'Ethiopian law strictly forbids any physical, psychological, or economic abuse within a marriage or domestic partnership. Violence by a spouse is a punishable crime.', article: 'Criminal Code Art. 564, 582', keywords: ['domestic', 'violence', 'marriage', 'husband', 'wife', 'hitting', 'abuse', 'beating'], rights: ['Right to request a protective order.', 'Right to leave the home safely without losing legal claims.', 'Right to free medical examination for evidence.'] },
        { title: 'Sexual Assault & Rape', icon: 'i-heroicons-hand-raised', description: 'Any sexual act committed without clear consent through force, intimidation, or coercion is a severe criminal offense.', article: 'Criminal Code Art. 620-628', keywords: ['rape', 'assault', 'sexual', 'force', 'consent'], rights: ['Right to absolute privacy during legal proceedings.', 'Right to emergency contraception and PEP.', 'Right to have a female officer handle your statement if requested.'] },
        { title: 'Stalking & Digital Abuse', icon: 'i-heroicons-device-phone-mobile', description: 'Intentionally harassing someone through constant unwanted communication, physical following, or threatening digital messages (cyberbullying).', article: 'Criminal Code Art. 585', keywords: ['stalking', 'cyberbullying', 'threats', 'messages', 'following', 'digital'], rights: ['Right to report threatening messages to cyber police.', 'Right to demand the deletion of non-consensual intimate images.', 'Right to obtain a restraining order.'] }
      ],
      myths: [
        { label: 'Myth: If I fight back, I can be arrested for assault.', content: 'Reality: The law recognizes self-defense. If you use reasonable force to protect yourself, you are exercising your legal right.' },
        { label: 'Myth: I cannot report abuse by my legal spouse.', content: 'Reality: Marriage does not grant permission for violence. Ethiopian law explicitly recognizes domestic violence as a crime.' },
        { label: 'Myth: I have to pay to open a criminal case.', content: 'Reality: Filing a police report for criminal offenses is entirely free. State prosecutors handle the case.' }
      ]
    },
    KE: {
      categories: [
        { title: 'Domestic Violence', icon: 'i-heroicons-home', description: 'The Protection Against Domestic Violence Act (PADV) outlaws physical, sexual, psychological, and economic abuse within families and homes in Kenya.', article: 'PADV Act 2015', keywords: ['domestic', 'violence', 'marriage', 'husband', 'wife', 'hitting', 'abuse'], rights: ['Right to seek a protection order from the courts.', 'Right to exclusive occupation of the shared residence (evicting the abuser).', 'Right to police assistance and escort to collect personal belongings.'] },
        { title: 'Sexual Offences', icon: 'i-heroicons-hand-raised', description: 'The Sexual Offences Act criminalizes rape, defilement, sexual harassment, and deliberate transmission of HIV or life-threatening diseases.', article: 'Sexual Offences Act No. 3 of 2006', keywords: ['rape', 'assault', 'sexual', 'force', 'consent'], rights: ['Right to immediate medical treatment and preservation of forensic evidence.', 'Right to testify in camera (closed court) to protect your privacy.', 'Right to protection from intimidation by the accused.'] },
        { title: 'Cyber Harassment', icon: 'i-heroicons-device-phone-mobile', description: 'Using digital means to communicate messages that are grossly offensive, indecent, or intend to cause fear and distress.', article: 'Computer Misuse and Cybercrimes Act 2018', keywords: ['stalking', 'cyberbullying', 'threats', 'messages', 'following', 'digital'], rights: ['Right to have non-consensual sexual images (revenge porn) taken down.', 'Right to prosecute cyber bullies.'] }
      ],
      myths: [
        { label: 'Myth: Domestic violence is a private family matter.', content: 'Reality: The PADV Act explicitly recognizes domestic violence as a public crime, and police are mandated by law to intervene.' },
        { label: 'Myth: I cannot get a protection order without a divorce.', content: 'Reality: Protection orders can be granted independently of any divorce proceedings to ensure immediate safety.' },
        { label: 'Myth: Medical evidence is the only way to prove rape.', content: 'Reality: While medical evidence is critical, corroborating testimonies, psychological trauma reports, and digital evidence are heavily relied upon.' }
      ]
    },
    CI: {
      categories: [
        { title: 'Domestic Violence', icon: 'i-heroicons-home', description: 'Ivorian law criminalizes domestic violence, protecting victims against physical, moral, and economic violence in domestic settings.', article: 'Code Pénal Art. 381-382', keywords: ['domestic', 'violence', 'mariage', 'hitting', 'abuse'], rights: ['Right to immediate police protection and medical assistance.', 'Right to request the eviction of the abuser from the family home.', 'Right to psychological and legal support.'] },
        { title: 'Sexual Assault', icon: 'i-heroicons-hand-raised', description: 'Any non-consensual sexual act, including marital rape, is strictly punishable under the penal code of Côte d\'Ivoire.', article: 'Code Pénal (Loi n° 2021-893)', keywords: ['rape', 'assault', 'sexual', 'force', 'consent', 'viol'], rights: ['Right to file a complaint without paying any fees.', 'Right to confidentiality and protection during investigations.', 'Right to medical certificates provided by public health facilities.'] },
        { title: 'Moral and Sexual Harassment', icon: 'i-heroicons-briefcase', description: 'Protection against sexual and moral harassment in all spaces, including the workplace and educational institutions.', article: 'Code du Travail / Code Pénal', keywords: ['workplace', 'harassment', 'harcèlement', 'travail'], rights: ['Right to protection against unfair dismissal if you report harassment.', 'Right to seek damages and compensation.', 'Right to remain anonymous during internal corporate investigations.'] }
      ],
      myths: [
        { label: 'Myth: The police do not intervene in couple quarrels.', content: 'Reality: The police are legally obligated to intervene and protect victims of domestic violence under the new penal code.' },
        { label: 'Myth: Marital rape does not exist.', content: 'Reality: Marital rape is explicitly criminalized in Côte d\'Ivoire. Consent is required within marriage.' },
        { label: 'Myth: I have to pay to get a medical certificate.', content: 'Reality: Medical certificates for victims of sexual and gender-based violence are provided free of charge in public hospitals.' }
      ]
    }
  }

  // French
  const fr = {
    ET: {
      categories: [
        { title: 'Violence Domestique', icon: 'i-heroicons-home', description: 'La loi éthiopienne interdit strictement tout abus physique, psychologique ou économique au sein du mariage.', article: 'Code Pénal Art. 564, 582', keywords: ['violence', 'mariage', 'abus'], rights: ['Droit de demander une ordonnance de protection.', 'Droit de quitter le domicile en toute sécurité.', 'Droit à un examen médical gratuit.'] },
        { title: 'Agression Sexuelle et Viol', icon: 'i-heroicons-hand-raised', description: 'Tout acte sexuel commis sans consentement clair est une infraction pénale grave.', article: 'Code Pénal Art. 620-628', keywords: ['viol', 'agression', 'consentement'], rights: ['Droit à une intimité absolue pendant la procédure.', 'Droit à la contraception d\'urgence et au PEP.', 'Droit d\'être entendue par une femme officier.'] },
        { title: 'Harcèlement Numérique', icon: 'i-heroicons-device-phone-mobile', description: 'Harcèlement intentionnel par des communications constantes non désirées ou des messages numériques menaçants.', article: 'Code Pénal Art. 585', keywords: ['cyberharcèlement', 'menaces'], rights: ['Droit de signaler les messages menaçants.', 'Droit d\'exiger la suppression d\'images intimes.', 'Droit d\'obtenir une ordonnance restrictive.'] }
      ],
      myths: [
        { label: 'Mythe: Si je me défends, je serai arrêtée.', content: 'Réalité: La loi reconnaît la légitime défense.' },
        { label: 'Mythe: Je ne peux pas dénoncer mon conjoint.', content: 'Réalité: Le mariage ne donne pas la permission d\'user de violence.' },
        { label: 'Mythe: Je dois payer pour ouvrir un dossier.', content: 'Réalité: Le dépôt d\'une plainte pénale est entièrement gratuit.' }
      ]
    },
    KE: {
      categories: [
        { title: 'Violence Domestique', icon: 'i-heroicons-home', description: 'La loi sur la protection contre la violence domestique (PADV) interdit les abus physiques, sexuels, psychologiques et économiques.', article: 'Loi PADV 2015', keywords: ['violence', 'mariage'], rights: ['Droit de demander une ordonnance de protection.', 'Droit à l\'occupation exclusive de la résidence commune.', 'Droit à l\'assistance policière.'] },
        { title: 'Infractions Sexuelles', icon: 'i-heroicons-hand-raised', description: 'La loi sur les infractions sexuelles criminalise le viol, les attouchements et le harcèlement.', article: 'Loi sur les infractions sexuelles 2006', keywords: ['viol', 'agression'], rights: ['Droit à un traitement médical immédiat.', 'Droit de témoigner à huis clos.', 'Droit à la protection contre l\'intimidation.'] },
        { title: 'Cyberharcèlement', icon: 'i-heroicons-device-phone-mobile', description: 'Utilisation de moyens numériques pour communiquer des messages offensants ou menaçants.', article: 'Loi sur les cybercrimes 2018', keywords: ['cyberharcèlement', 'menaces'], rights: ['Droit au retrait d\'images sexuelles non consensuelles.', 'Droit de poursuivre les cyberharceleurs.'] }
      ],
      myths: [
        { label: 'Mythe: La violence domestique est une affaire privée.', content: 'Réalité: La loi PADV reconnaît explicitement la violence domestique comme un crime public.' },
        { label: 'Mythe: Pas d\'ordonnance de protection sans divorce.', content: 'Réalité: Les ordonnances peuvent être accordées indépendamment d\'une procédure de divorce.' },
        { label: 'Mythe: Les preuves médicales sont le seul moyen de prouver un viol.', content: 'Réalité: Les témoignages et les rapports psychologiques sont également cruciaux.' }
      ]
    },
    CI: {
      categories: [
        { title: 'Violences Domestiques', icon: 'i-heroicons-home', description: 'La loi ivoirienne criminalise les violences domestiques, protégeant les victimes contre les violences physiques, morales et économiques.', article: 'Code Pénal Art. 381-382', keywords: ['violence', 'mariage'], rights: ['Droit à une protection policière immédiate.', 'Droit de demander l\'expulsion de l\'agresseur.', 'Droit à un soutien psychologique et juridique.'] },
        { title: 'Agressions Sexuelles', icon: 'i-heroicons-hand-raised', description: 'Tout acte sexuel non consensuel, y compris le viol conjugal, est strictement puni.', article: 'Code Pénal (Loi n° 2021-893)', keywords: ['viol', 'agression'], rights: ['Droit de porter plainte sans frais.', 'Droit à la confidentialité et protection.', 'Droit aux certificats médicaux gratuits.'] },
        { title: 'Harcèlement Moral et Sexuel', icon: 'i-heroicons-briefcase', description: 'Protection contre le harcèlement sexuel et moral dans tous les espaces, y compris au travail.', article: 'Code du Travail / Code Pénal', keywords: ['travail', 'harcèlement'], rights: ['Droit à la protection contre le licenciement abusif.', 'Droit de demander des dommages et intérêts.', 'Droit à l\'anonymat lors d\'enquêtes internes.'] }
      ],
      myths: [
        { label: 'Mythe: La police n\'intervient pas dans les querelles de couple.', content: 'Réalité: La police a l\'obligation légale d\'intervenir.' },
        { label: 'Mythe: Le viol conjugal n\'existe pas.', content: 'Réalité: Le viol conjugal est explicitement criminalisé en Côte d\'Ivoire.' },
        { label: 'Mythe: Je dois payer pour un certificat médical.', content: 'Réalité: Les certificats médicaux sont délivrés gratuitement dans les hôpitaux publics.' }
      ]
    }
  }

  // Amharic (am)
  const am = {
    ET: {
      categories: [
        { title: 'የቤተሰብ ውስጥ ጥቃት', icon: 'i-heroicons-home', description: 'የኢትዮጵያ ህግ በጋብቻ ውስጥ ማንኛውንም አካላዊ፣ ስነ-ልቦናዊ ወይም ኢኮኖሚያዊ ጥቃት በጥብቅ ይከለክላል።', article: 'የወንጀል ህግ አንቀጽ 564, 582', keywords: ['ጥቃት', 'ቤተሰብ', 'ጋብቻ'], rights: ['የጥበቃ ትዕዛዝ የመጠየቅ መብት።', 'ህጋዊ መብት ሳያጡ ከቤት በሰላም የመውጣት መብት።', 'ነፃ የህክምና ምርመራ የማግኘት መብት።'] },
        { title: 'ወሲባዊ ጥቃት እና አስገድዶ መድፈር', icon: 'i-heroicons-hand-raised', description: 'ያለግልፅ ስምምነት በሃይል ወይም በማስፈራራት የሚፈፀም ማንኛውም ወሲባዊ ድርጊት ከባድ ወንጀል ነው።', article: 'የወንጀል ህግ አንቀጽ 620-628', keywords: ['አስገድዶ', 'መድፈር', 'ወሲባዊ'], rights: ['በህግ ሂደት ውስጥ ሙሉ ግላዊነት የመጠበቅ መብት።', 'የአደጋ ጊዜ የእርግዝና መከላከያ እና የኤችአይቪ መከላከያ (PEP) የማግኘት መብት።', 'ቃልዎን በሴት የፖሊስ መኮንን እንዲሰጡ የመጠየቅ መብት።'] },
        { title: 'ዲጂታል ትንኮሳ', icon: 'i-heroicons-device-phone-mobile', description: 'ያልተፈለገ ግንኙነት በማድረግ ወይም በማስፈራሪያ መልእክቶች ሰውን ሆን ብሎ ማዋከብ።', article: 'የወንጀል ህግ አንቀጽ 585', keywords: ['ዲጂታል', 'ማስፈራሪያ'], rights: ['ማስፈራሪያ መልእክቶችን ለፖሊስ ሪፖርት የማድረግ መብት።', 'ያለፈቃድ የተለቀቁ ምስሎች እንዲጠፉ የመጠየቅ መብት።', 'የእግድ ትዕዛዝ የማግኘት መብት።'] }
      ],
      myths: [
        { label: 'አፈታሪክ: ራሴን ለመከላከል ብሞክር እታሰራለሁ።', content: 'እውነታ: ህጉ ራስን መከላከልን ይገነዘባል። ራስዎን ለመጠበቅ ተመጣጣኝ ሃይል ከተጠቀሙ ህጋዊ መብትዎን እየተጠቀሙ ነው።' },
        { label: 'አፈታሪክ: በህጋዊ ባለቤቴ ላይ ክስ ማቅረብ አልችልም።', content: 'እውነታ: ጋብቻ ለጥቃት ፈቃድ አይሰጥም። የኢትዮጵያ ህግ የቤተሰብ ውስጥ ጥቃትን እንደ ወንጀል ይቆጥራል።' },
        { label: 'አፈታሪክ: የወንጀል ክስ ለመክፈት መክፈል አለብኝ።', content: 'እውነታ: የወንጀል ሪፖርት (እንደ አስገድዶ መድፈር) ለፖሊስ ማቅረብ ሙሉ በሙሉ ነፃ ነው።' }
      ]
    },
    // Fallback English for KE and CI when in Amharic
    KE: en.KE,
    CI: en.CI
  }


  // Swahili (sw)
  const sw = {
    ET: {
      categories: [
        { title: 'Unyanyasaji wa Majumbani', icon: 'i-heroicons-home', description: 'Sheria ya Ethiopia inakataza kabisa unyanyasaji wowote wa kimwili, kisaikolojia, au kiuchumi ndani ya ndoa. Unyanyasaji na mwenzi ni uhalifu unaoadhibiwa.', article: 'Kanuni ya Jinai Art. 564, 582', keywords: ['unyanyasaji', 'majumbani', 'ndoa', 'kupiga'], rights: ['Haki ya kuomba amri ya ulinzi.', 'Haki ya kuondoka nyumbani salama bila kupoteza madai ya kisheria.', 'Haki ya uchunguzi wa matibabu bure kwa ushahidi.'] },
        { title: 'Shambulio la Kijinsia na Ubakaji', icon: 'i-heroicons-hand-raised', description: 'Tendo lolote la ngono linalofanywa bila ridhaa ya wazi kwa nguvu, vitisho, au shuruti ni kosa kubwa la jinai.', article: 'Kanuni ya Jinai Art. 620-628', keywords: ['ubakaji', 'shambulio', 'kijinsia', 'nguvu'], rights: ['Haki ya faragha kabisa wakati wa kesi.', 'Haki ya uzazi wa mpango wa dharura na PEP.', 'Haki ya kuwa na afisa wa kike kushughulikia taarifa yako ukiomba.'] },
        { title: 'Unyanyasaji wa Mtandaoni', icon: 'i-heroicons-device-phone-mobile', description: 'Kumnyanyasa mtu kwa makusudi kupitia mawasiliano ya mara kwa mara yasiyohitajika, au ujumbe wa kidijitali wa kutisha.', article: 'Kanuni ya Jinai Art. 585', keywords: ['mtandaoni', 'vitisho', 'ujumbe'], rights: ['Haki ya kuripoti ujumbe wa kutisha kwa polisi wa mtandao.', 'Haki ya kudai kufutwa kwa picha za karibu zisizoridhiwa.', 'Haki ya kupata amri ya zuio.'] }
      ],
      myths: [
        { label: 'Hadithi: Nikijitetea, ninaweza kukamatwa kwa shambulio.', content: 'Ukweli: Sheria inatambua kujilinda. Ukitumia nguvu inayofaa kujilinda, unatumia haki yako ya kisheria.' },
        { label: 'Hadithi: Siwezi kuripoti unyanyasaji na mwenzi wangu wa ndoa.', content: 'Ukweli: Ndoa haitoi ruhusa ya unyanyasaji. Sheria ya Ethiopia inatambua wazi unyanyasaji wa majumbani kama uhalifu.' },
        { label: 'Hadithi: Inabidi nilipe ili kufungua kesi ya jinai.', content: 'Ukweli: Kufungua ripoti ya polisi kwa makosa ya jinai ni bure kabisa.' }
      ]
    },
    KE: {
      categories: [
        { title: 'Unyanyasaji wa Majumbani', icon: 'i-heroicons-home', description: 'Sheria ya Ulinzi Dhidi ya Unyanyasaji wa Majumbani (PADV) inaharamisha unyanyasaji wa kimwili, kingono, kisaikolojia na kiuchumi ndani ya familia nchini Kenya.', article: 'Sheria ya PADV 2015', keywords: ['unyanyasaji', 'majumbani', 'ndoa', 'kupiga'], rights: ['Haki ya kuomba amri ya ulinzi kutoka mahakamani.', 'Haki ya kumiliki makazi peke yako (kumfukuza mnyanyasaji).', 'Haki ya usaidizi wa polisi kuchukua vitu binafsi.'] },
        { title: 'Makosa ya Kijinsia', icon: 'i-heroicons-hand-raised', description: 'Sheria ya Makosa ya Kijinsia inaharamisha ubakaji, unajisi, unyanyasaji wa kijinsia, na usambazaji wa makusudi wa VVU.', article: 'Sheria ya Makosa ya Kijinsia 2006', keywords: ['ubakaji', 'shambulio', 'kijinsia', 'nguvu'], rights: ['Haki ya matibabu ya haraka na kuhifadhi ushahidi.', 'Haki ya kutoa ushahidi faraghani.', 'Haki ya kulindwa dhidi ya vitisho kutoka kwa mtuhumiwa.'] },
        { title: 'Unyanyasaji wa Mtandaoni', icon: 'i-heroicons-device-phone-mobile', description: 'Kutumia njia za kidijitali kuwasilisha ujumbe wa kuudhi au unaokusudia kusababisha hofu.', article: 'Sheria ya Matumizi Mabaya ya Kompyuta 2018', keywords: ['mtandaoni', 'vitisho', 'ujumbe'], rights: ['Haki ya kuondolewa kwa picha za ngono zisizoridhiwa.', 'Haki ya kushtaki wanyanyasaji wa mtandaoni.'] }
      ],
      myths: [
        { label: 'Hadithi: Unyanyasaji wa majumbani ni suala binafsi la familia.', content: 'Ukweli: Sheria inatambua wazi unyanyasaji wa majumbani kama uhalifu wa umma, na polisi wanatakiwa kuingilia kati.' },
        { label: 'Hadithi: Siwezi kupata amri ya ulinzi bila talaka.', content: 'Ukweli: Amri za ulinzi zinaweza kutolewa bila kujali kesi yoyote ya talaka.' },
        { label: 'Hadithi: Ushahidi wa matibabu ndio njia pekee ya kuthibitisha ubakaji.', content: 'Ukweli: Ushahidi wa watu wengine, ripoti za kiwewe, na ushahidi wa kidijitali pia unategemewa.' }
      ]
    },
    CI: en.CI // Fallback to French/English for Ivory Coast as Swahili is not common there
  }

  // Arabic (ar)
  const ar = {
    ET: {
      categories: [
        { title: 'العنف المنزلي', icon: 'i-heroicons-home', description: 'يحظر القانون الإثيوبي بصرامة أي إساءة جسدية أو نفسية أو اقتصادية داخل الزواج. العنف من قبل الزوج هو جريمة يعاقب عليها القانون.', article: 'قانون العقوبات المادة 564، 582', keywords: ['عنف', 'منزلي', 'زواج', 'ضرب'], rights: ['الحق في طلب أمر حماية.', 'الحق في مغادرة المنزل بأمان دون فقدان المطالبات القانونية.', 'الحق في فحص طبي مجاني للحصول على أدلة.'] },
        { title: 'الاعتداء الجنسي والاغتصاب', icon: 'i-heroicons-hand-raised', description: 'أي فعل جنسي يُرتكب دون موافقة واضحة عن طريق القوة أو التخويف أو الإكراه هو جريمة جنائية خطيرة.', article: 'قانون العقوبات المادة 620-628', keywords: ['اغتصاب', 'اعتداء', 'جنسي', 'قوة'], rights: ['الحق في الخصوصية المطلقة أثناء الإجراءات القانونية.', 'الحق في وسائل منع الحمل الطارئة و PEP.', 'الحق في أن تتعامل ضابطة مع إفادتك إذا طلبت ذلك.'] },
        { title: 'المطاردة والإساءة الرقمية', icon: 'i-heroicons-device-phone-mobile', description: 'مضايقة شخص عن قصد من خلال التواصل المستمر غير المرغوب فيه أو الرسائل الرقمية التهديدية.', article: 'قانون العقوبات المادة 585', keywords: ['مطاردة', 'تهديدات', 'رسائل', 'رقمية'], rights: ['الحق في إبلاغ شرطة الجرائم الإلكترونية عن الرسائل التهديدية.', 'الحق في المطالبة بحذف الصور الحميمة غير الرضائية.', 'الحق في الحصول على أمر تقييدي.'] }
      ],
      myths: [
        { label: 'الخرافة: إذا قاومت، يمكن القبض علي بتهمة الاعتداء.', content: 'الواقع: يعترف القانون بالدفاع عن النفس. إذا استخدمت قوة معقولة لحماية نفسك، فأنت تمارس حقك القانوني.' },
        { label: 'الخرافة: لا يمكنني الإبلاغ عن إساءة من قبل زوجي القانوني.', content: 'الواقع: الزواج لا يمنح الإذن بالعنف. القانون الإثيوبي يعترف صراحة بالعنف المنزلي كجريمة.' },
        { label: 'الخرافة: يجب أن أدفع لفتح قضية جنائية.', content: 'الواقع: تقديم تقرير للشرطة عن الجرائم الجنائية مجاني تماماً.' }
      ]
    },
    KE: {
      categories: [
        { title: 'العنف المنزلي', icon: 'i-heroicons-home', description: 'يحظر قانون الحماية من العنف المنزلي الإساءة الجسدية والجنسية والنفسية والاقتصادية داخل الأسر في كينيا.', article: 'قانون PADV 2015', keywords: ['عنف', 'منزلي', 'زواج'], rights: ['الحق في طلب أمر حماية من المحاكم.', 'الحق في الإشغال الحصري للسكن المشترك (طرد المعتدي).', 'الحق في مساعدة الشرطة لجمع المتعلقات الشخصية.'] },
        { title: 'الجرائم الجنسية', icon: 'i-heroicons-hand-raised', description: 'يجرم قانون الجرائم الجنسية الاغتصاب وهتك العرض والتحرش الجنسي والانتقال المتعمد لفيروس نقص المناعة البشرية.', article: 'قانون الجرائم الجنسية 2006', keywords: ['اغتصاب', 'اعتداء'], rights: ['الحق في العلاج الطبي الفوري والحفاظ على أدلة الطب الشرعي.', 'الحق في الإدلاء بالشهادة في جلسة مغلقة لحماية خصوصيتك.', 'الحق في الحماية من الترهيب من قبل المتهم.'] },
        { title: 'المضايقات الإلكترونية', icon: 'i-heroicons-device-phone-mobile', description: 'استخدام الوسائل الرقمية لتوصيل رسائل مسيئة أو تنوي إثارة الخوف.', article: 'قانون إساءة استخدام الكمبيوتر 2018', keywords: ['إلكترونية', 'تهديدات'], rights: ['الحق في إزالة الصور الجنسية غير الرضائية.', 'الحق في مقاضاة المتنمرين عبر الإنترنت.'] }
      ],
      myths: [
        { label: 'الخرافة: العنف المنزلي مسألة عائلية خاصة.', content: 'الواقع: يعترف القانون صراحة بالعنف المنزلي كجريمة عامة، والشرطة ملزمة بالتدخل.' },
        { label: 'الخرافة: لا يمكنني الحصول على أمر حماية بدون طلاق.', content: 'الواقع: يمكن منح أوامر الحماية بشكل مستقل عن أي إجراءات طلاق.' },
        { label: 'الخرافة: الأدلة الطبية هي الطريقة الوحيدة لإثبات الاغتصاب.', content: 'الواقع: يتم الاعتماد بشدة على الشهادات المؤيدة وتقارير الصدمات النفسية والأدلة الرقمية.' }
      ]
    },
    CI: {
      categories: [
        { title: 'العنف المنزلي', icon: 'i-heroicons-home', description: 'يجرم قانون ساحل العاج العنف المنزلي، ويحمي الضحايا من العنف الجسدي والأخلاقي والاقتصادي.', article: 'قانون العقوبات المادة 381-382', keywords: ['عنف', 'منزلي'], rights: ['الحق في حماية الشرطة الفورية والمساعدة الطبية.', 'الحق في طلب طرد المعتدي من منزل الأسرة.', 'الحق في الدعم النفسي والقانوني.'] },
        { title: 'الاعتداء الجنسي', icon: 'i-heroicons-hand-raised', description: 'أي فعل جنسي غير رضائي، بما في ذلك الاغتصاب الزوجي، يعاقب عليه بشدة بموجب قانون العقوبات.', article: 'قانون العقوبات', keywords: ['اغتصاب', 'اعتداء'], rights: ['الحق في تقديم شكوى دون دفع أي رسوم.', 'الحق في السرية والحماية أثناء التحقيقات.', 'الحق في الحصول على شهادات طبية مجانية.'] },
        { title: 'التحرش المعنوي والجنسي', icon: 'i-heroicons-briefcase', description: 'الحماية من التحرش الجنسي والمعنوي في جميع الأماكن، بما في ذلك مكان العمل.', article: 'قانون العمل', keywords: ['تحرش', 'عمل'], rights: ['الحق في الحماية من الفصل التعسفي.', 'الحق في المطالبة بالتعويض.', 'الحق في عدم الكشف عن هويتك أثناء التحقيقات الداخلية.'] }
      ],
      myths: [
        { label: 'الخرافة: الشرطة لا تتدخل في خلافات الأزواج.', content: 'الواقع: الشرطة ملزمة قانونًا بالتدخل وحماية الضحايا.' },
        { label: 'الخرافة: الاغتصاب الزوجي غير موجود.', content: 'الواقع: الاغتصاب الزوجي مجرم صراحة في ساحل العاج.' },
        { label: 'الخرافة: يجب أن أدفع للحصول على شهادة طبية.', content: 'الواقع: يتم تقديم الشهادات الطبية لضحايا العنف مجاناً في المستشفيات العامة.' }
      ]
    }
  }


  const data: Record<string, any> = { en, fr, am, sw, ar }
  const langData = data[lang] || en
  const countryData = langData[country] || langData['ET'] || en[country as keyof typeof en] || en['ET']
  
  return { categories: countryData.categories, myths: countryData.myths }
}
