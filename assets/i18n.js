/* GELCO bilingual runtime
 * - One translation map for both pages (keys are unique across pages)
 * - data-i18n="key"      → swap textContent
 * - data-i18n-html="key"  → swap innerHTML (for strings that contain <span class="foil">)
 * - data-i18n-attr="key|attr"  → swap an attribute (e.g. placeholder, alt, title)
 * - localStorage('gelco.lang') persists choice; default ar.
 */
(function(){
  const T = {
    ar: {
      // ----- META (per-page) -----
      'meta.title.home': 'جيلكو للاستثمار والتطوير | GELCO',
      'meta.title.catering': 'الإعاشة والمطبخ المركزي | GELCO',
      'meta.desc.home': 'جيلكو — نبني النمو ونصنع الفرص. شركة سعودية للاستثمار والتطوير التجاري وإدارة المشاريع والمطاعم.',
      'meta.desc.catering': 'جيلكو — خدمات الإعاشة والمطبخ المركزي: وجبات منضبطة الجودة لمواقع المشاريع والمنشآت والفعاليات، داخل المملكة وخارجها.',

      // ----- NAV -----
      'nav.home': 'الرئيسية',
      'nav.about': 'من نحن',
      'nav.services': 'خدماتنا',
      'nav.projects': 'مشاريعنا',
      'nav.why': 'لماذا جيلكو',
      'nav.contact': 'تواصل معنا',
      'nav.catering': 'الإعاشة والمطبخ المركزي',
      'nav.backHome': 'العودة للرئيسية',
      'nav.quote': 'طلب عرض سعر',

      // ----- HERO (home) -----
      'home.hero.title': 'نبني <span class="foil">النمو</span> ونصنع <span class="foil">الفرص</span>',
      'home.hero.motto': 'BUILDING GROWTH — CREATING OPPORTUNITIES',
      'home.hero.lede': 'شركة سعودية متخصصة في الاستثمار والتطوير التجاري وإدارة المشاريع والمطاعم، تنطلق من مكة المكرمة لبناء فرص نوعية وشراكات استراتيجية.',
      'home.hero.cta1': 'اطلب شراكة',
      'home.hero.cta2': 'تعرّف علينا',
      'home.scroll': 'SCROLL',

      // ----- STATS -----
      'stats.l1': 'قطاعات استثمارية',
      'stats.l2': 'قيم مؤسسية',
      'stats.l3': 'التزام بالجودة',
      'stats.l4': 'الانطلاق نحو المملكة',

      // ----- ABOUT -----
      'about.eyebrow': 'من نحن',
      'about.title': 'شركاء النجاح في <span class="foil">رحلة النمو</span>',
      'about.big': 'جيلكو شركة سعودية متخصصة في الاستثمار والتطوير التجاري وإدارة المشاريع والمطاعم.',
      'about.body': 'نسعى إلى تقديم حلول استثمارية مبتكرة وشراكات ناجحة تسهم في النمو الاقتصادي وتحقيق القيمة المستدامة، انطلاقاً من مكة المكرمة نحو مختلف مناطق المملكة.',
      'about.vision.title': 'رؤيتنا',
      'about.vision.body': 'أن نكون من الشركات الرائدة في الاستثمار والتطوير التجاري بالمملكة.',
      'about.mission.title': 'رسالتنا',
      'about.mission.body': 'تقديم مشاريع وخدمات عالية الجودة تحقق النجاح لشركائنا.',

      // ----- SERVICES -----
      'services.eyebrow': 'خدماتنا',
      'services.title': 'حلول متكاملة <span class="foil">لكل فرصة</span>',
      'services.lede': 'منظومة خدمات تغطّي دورة الاستثمار كاملة، من اقتناص الفرصة إلى تشغيلها وتنميتها.',
      'services.s1.h': 'الاستثمار التجاري',
      'services.s1.p': 'استثمار وتطوير المشاريع الواعدة وتحويلها إلى قصص نجاح مستدامة تحقق عوائد متنامية.',
      'services.s2.h': 'إدارة وتشغيل المطاعم',
      'services.s2.p': 'إدارة وتشغيل العلامات التجارية الغذائية بمعايير جودة عالية وتميّز في تجربة الضيف.',
      'services.s3.h': 'خدمات الصيانة والنظافة ',
      'services.s3.p': 'تقديم باقات خدمات الصيانة والنظافة ل مختلف الانشطة الخاصة والحكومية .',
      'services.s4.h': 'الشراكات التجارية',
      'services.s4.p': 'بناء شراكات استراتيجية مع المستثمرين ورواد الأعمال لتعظيم العوائد وتوسيع الأثر.',

      // ----- PROJECTS -----
      'projects.eyebrow': 'مشاريعنا',
      'projects.title': 'محفظة من <span class="foil">الفرص النوعية</span>',
      'projects.p1.h': 'سلسلة مطاعم مذاق',
      'projects.p1.p': 'علامة غذائية بإدارة وتشغيل متكامل',
      'projects.p2.h': 'المشاريع التجارية',
      'projects.p2.p': 'استثمارات قائمة تحقق عوائد مستقرة',
      'projects.p3.h': 'المشاريع المستقبلية',
      'projects.p3.p': 'فرص قيد التطوير ضمن خطة التوسّع',

      // ----- GROWTH -----
      'growth.eyebrow': 'فلسفتنا',
      'growth.title': 'الفرصة الحقيقية <span class="foil">تُبنى، ولا تُنتظر.</span>',
      'growth.body': 'نقرأ السوق، ندرس الفرصة، ونبني عليها قيمة تنمو مع الوقت. كل قرار استثماري في جيلكو خطوة محسوبة في رحلة نمو طويلة الأمد.',
      'growth.cta': 'اكتشف منهجيتنا',
      'growth.chart.label': 'النمو',

      // ----- WHY -----
      'why.eyebrow': 'لماذا جيلكو',
      'why.title': 'ما الذي <span class="foil">يميّزنا</span>',
      'why.w1.h': 'خبرة إدارية واستثمارية', 'why.w1.p': 'فريق يمتلك خبرة عميقة في إدارة الاستثمارات وقيادة المشاريع نحو النجاح.',
      'why.w2.h': 'شراكات موثوقة',          'why.w2.p': 'علاقات استراتيجية مبنية على الثقة والشفافية مع نخبة من الشركاء.',
      'why.w3.h': 'حلول متكاملة',           'why.w3.p': 'منظومة خدمات شاملة تغطّي دورة الاستثمار من التخطيط إلى التشغيل.',
      'why.w4.h': 'فريق عمل محترف',         'why.w4.p': 'كفاءات متخصصة تعمل بروح الفريق الواحد لتحقيق أهداف شركائنا.',
      'why.w5.h': 'التزام بالجودة',         'why.w5.p': 'معايير صارمة في كل تفصيل تضمن نتائج تليق بطموح شركائنا.',
      'why.w6.h': 'رؤية نمو مستدام',        'why.w6.p': 'قرارات استثمارية مدروسة تستهدف القيمة طويلة الأمد.',

      // ----- PARTNER -----
      'partner.title': 'اديك مشروع في تجهيز وتطوير المطاعم و <span class="foil">تبحث له عن شريك؟</span>',
      'partner.body': 'نبني شراكات استراتيجية تحوّل الطموح إلى نجاح ملموس. لنصنع الفرصة القادمة معاً.',
      'partner.cta': 'اطلب شراكة الآن',

      // ----- CONTACT (shared) -----
      'contact.eyebrow': 'تواصل معنا',
      'contact.title': 'لنبدأ <span class="foil">الحديث</span>',
      'contact.phone.k': 'الهاتف',
      'contact.email.k': 'البريد',
      'contact.location.k': 'الموقع',
      'contact.location.v': '2210 Al Masjid Al Haram Rd, Al Mursalat, Makkah 24247, Saudi Arabia',
      'contact.map': 'موقعنا على الخريطة',
      'contact.form.title': 'أرسل رسالتك',
      'contact.form.sub': 'سيتواصل معك فريقنا في أقرب وقت ممكن.',
      'contact.form.name': 'الاسم',
      'contact.form.name.ph': 'اسمك الكريم',
      'contact.form.phone': 'الهاتف',
      'contact.form.phone.ph': 'رقم الجوال',
      'contact.form.email': 'البريد',
      'contact.form.email.ph': 'example@email.com',
      'contact.form.message': 'الرسالة',
      'contact.form.message.ph': 'كيف يمكننا مساعدتك؟',
      'contact.form.send': 'إرسال الرسالة عبر واتساب',

      // ----- PRIVACY -----
      'privacy.agree.pre': 'أوافق على ',
      'privacy.agree.link': 'سياسة الخصوصية',
      'privacy.agree.post': ' الخاصة بجيلكو.',
      'privacy.modal.title': 'سياسة الخصوصية',
      'privacy.modal.intro': 'في جيلكو نحترم خصوصيتك ولا نطلب منك سوى بيانات أساسية لتسهيل التواصل عبر واتساب.',
      'privacy.modal.collect.h': 'ما الذي نجمعه؟',
      'privacy.modal.collect.b': 'نجمع فقط: الاسم، رقم الجوال، البريد الإلكتروني، ونص رسالتك. لا نجمع أي بيانات إضافية تلقائياً.',
      'privacy.modal.use.h': 'كيف نستخدمها؟',
      'privacy.modal.use.b': 'تُستخدم هذه البيانات حصراً للرد على استفسارك أو طلبك عبر واتساب. لا تُباع ولا تُشارك مع أطراف ثالثة لأغراض تسويقية.',
      'privacy.modal.wa.h': 'التحويل إلى واتساب',
      'privacy.modal.wa.b': 'عند الضغط على زر الإرسال يتم تحويلك إلى تطبيق واتساب مع رسالة تحتوي بياناتك. من تلك اللحظة فصاعداً تخضع المحادثة لسياسة خصوصية واتساب (WhatsApp / Meta) وليس لسياستنا.',
      'privacy.modal.rights.h': 'حقوقك',
      'privacy.modal.rights.b': 'يمكنك في أي وقت طلب حذف بياناتك أو تعديلها عبر مراسلتنا على: info@gelco.sa',
      'privacy.modal.close': 'إغلاق',
      'privacy.alert': 'يرجى الموافقة على سياسة الخصوصية قبل الإرسال.',
      'footer.legal': 'سياسة الخصوصية',

      // ----- FOOTER -----
      'footer.about': 'شركة سعودية متخصصة في الاستثمار والتطوير التجاري وإدارة المشاريع والمطاعم، تبني فرصاً نوعية وشراكات استراتيجية.',
      'footer.col1.head': 'الشركة',
      'footer.col2.head': 'روابط',
      'footer.col3.head': 'تواصل',
      'footer.col2.l1': 'فلسفتنا',
      'footer.col2.l2': 'اطلب شراكة',
      'footer.col3.location': '2210 Al Masjid Al Haram Rd, Al Mursalat, Makkah 24247, Saudi Arabia',
      'footer.brand': 'جيلكو للاستثمار والتطوير',
      'footer.copyright': '· BUILDING GROWTH · CREATING OPPORTUNITIES',

      // ----- CATERING PAGE -----
      'cat.hero.eyebrow': 'الإعاشة والمطبخ المركزي',
      'cat.hero.title': 'إعاشة <span class="foil">موثوقة</span>. مطبخ مركزي <span class="foil">بمعايير عالمية</span>',
      'cat.hero.lede': 'شريكك في تقديم وجبات منضبطة الجودة لمواقع المشاريع والمنشآت والفعاليات — داخل المملكة وخارجها، بإدارة مباشرة وفِرَق ميدانية.',
      'cat.hero.cta1': 'اطلب عرض سعر',
      'cat.hero.cta2': 'عرض الباقات',

      'cat.about.eyebrow': 'عننا',
      'cat.about.title': 'ذراع <span class="foil">الإعاشة</span> في جيلكو',
      'cat.about.lede': 'ذراعٌ متخصّص يحمل إرث جيلكو في الانضباط الاستثماري ويترجمه إلى عمليات إعاشة قابلة للنمو والتشغيل اليومي بثقة.',
      'cat.about.body': 'تأسّس قسم الإعاشة والمطبخ المركزي في جيلكو على فكرة بسيطة وثابتة: أن تكون الوجبة التي تصل إلى العامل في الموقع، أو الزائر في الفعالية، أو الموظف في المقر، انعكاساً لمعايير شركة استثمارية مسؤولة لا لعملية مطبخ تقليدية. نخدم من <span style="color:var(--gold)">مكة المكرمة</span> إلى مختلف مدن المملكة، ومن داخلها إلى المشاريع الإقليمية خارجها، عبر فِرَق ميدانية وسلسلة إمداد منضبطة تبدأ من اختيار الموردين وتنتهي عند الميناء الأخير: <span style="color:var(--gold)">طاولة العميل</span>.',

      'cat.serve.eyebrow': 'لمن نقدّم خدماتنا',
      'cat.serve.title': 'شركاؤنا في <span class="foil">المسيرة</span>',
      'cat.serve.lede': 'نخدم طيفاً واسعاً من العملاء — من المستثمر الأول الذي يطلق فكرته، إلى الجهة الكبرى التي تتعاقد على إمداد المواقع، داخل المملكة وخارجها.',
      'cat.serve.t1.h': 'أصحاب المشاريع الجديدة',
      'cat.serve.t1.p': 'نواكب المشروع من فكرته الأولى — بنية المطبخ، تصميم القوائم، تأهيل الفِرَق، التراخيص — لنسلّمه جاهزاً للتشغيل.',
      'cat.serve.t1.b': 'داخل المملكة وخارجها',
      'cat.serve.t2.h': 'الباحثون عن فرص استثمارية',
      'cat.serve.t2.p': 'دراسات جدوى ودخول في شراكات تشغيلية في قطاع الإعاشة والمطاعم بنماذج واضحة المخاطر والعوائد.',
      'cat.serve.t2.b': 'شراكات استراتيجية',
      'cat.serve.t3.h': 'المستثمرون في قطاع المطاعم',
      'cat.serve.t3.p': 'تشغيل وإدارة العلامات المطعمية القائمة وتطوير وحدات جديدة بإطار جودة موحّد تحت مظلة جيلكو.',
      'cat.serve.t3.b': 'تشغيل وإدارة',
      'cat.serve.t4.h': 'جهات تطلب توريد وجبات',
      'cat.serve.t4.p': 'عقود إمداد وجبات للمواقع الإنشائية والمنشآت الحكومية والفعاليات، بالتزام صارم بالتوقيت والجودة.',
      'cat.serve.t4.b': 'عقود طويلة الأمد',

      'cat.pkg.eyebrow': 'الباقات',
      'cat.pkg.title': 'باقات <span class="foil">الإعاشة</span>',
      'cat.pkg.lede': 'ثلاث باقات مصمَّمة لتغطّي مختلف أحجام التشغيل، مع مرونة في التخصيص لكل عميل وفق طبيعة موقعه.',
      'cat.pkg.p1.tier': 'الباقة الأساسية',
      'cat.pkg.p1.h': 'إعاشة الموقع',
      'cat.pkg.p1.scale': 'حتى 200 وجبة يومياً',
      'cat.pkg.p1.desc': 'للمواقع الإنشائية الصغيرة وفِرَق العمل الميدانية. وجبات منضبطة الكمية والقيمة الغذائية، تُسلَّم يومياً.',
      'cat.pkg.p1.l1': 'وجبتان رئيسيتان + وجبة خفيفة',
      'cat.pkg.p1.l2': 'قوائم أسبوعية متغيّرة',
      'cat.pkg.p1.l3': 'توصيل بمركبات مبرَّدة',
      'cat.pkg.p1.l4': 'مشرف ميداني للمتابعة',
      'cat.pkg.p2.tier': 'الباقة القياسية',
      'cat.pkg.p2.h': 'المطبخ المركزي',
      'cat.pkg.p2.scale': 'حتى 1,500 وجبة يومياً',
      'cat.pkg.p2.desc': 'للمنشآت متوسطة الحجم والمعسكرات وعقود التشغيل طويلة الأمد. إنتاج مركزي وتوزيع لعدّة مواقع.',
      'cat.pkg.p2.l1': 'ثلاث وجبات يومية + مشروبات',
      'cat.pkg.p2.l2': 'قوائم موسمية وتنوّع ثقافي',
      'cat.pkg.p2.l3': 'تطبيق إجراءات HACCP الداخلية',
      'cat.pkg.p2.l4': 'تقارير شهرية للعميل',
      'cat.pkg.p2.l5': 'خط بديل في حالات الطوارئ',
      'cat.pkg.p3.tier': 'الباقة المتقدّمة',
      'cat.pkg.p3.h': 'المشاريع الكبرى والفعاليات',
      'cat.pkg.p3.scale': '+1,500 وجبة / مناسبات خاصة',
      'cat.pkg.p3.desc': 'للمشاريع الضخمة، المعسكرات الحكومية، والفعاليات النوعية. مطبخ متنقل وشيف تنفيذي مخصّص.',
      'cat.pkg.p3.l1': 'قوائم متعدّدة المسارات (تخصصي / نباتي / دولي)',
      'cat.pkg.p3.l2': 'شيف تنفيذي ومراقب جودة',
      'cat.pkg.p3.l3': 'مطبخ متنقل عند الحاجة',
      'cat.pkg.p3.l4': 'بروتوكول ضيافة للمناسبات',
      'cat.pkg.p3.l5': 'دعم تشغيلي على مدار الساعة',
      'cat.pkg.note': 'جميع الباقات قابلة للتخصيص — تواصل مع المدير العام لتفصيل عرض يطابق احتياجك.',
      'cat.pkg.featured': 'الأكثر طلباً',

      'cat.svc.eyebrow': 'خدمات المطبخ المركزي',
      'cat.svc.title': 'ما <span class="foil">نقدّمه</span>',
      'cat.svc.lede': 'من المطبخ إلى الطاولة — سلسلة عمليات متّسقة تحمي الجودة في كل مرحلة.',
      'cat.svc.s1.h': 'تحضير وإنتاج الوجبات', 'cat.svc.s1.p': 'مطابخ مركزية مجهّزة بمعايير صناعية، بطاقة تشغيلية قابلة للتوسّع حسب حجم العقد.',
      'cat.svc.s2.h': 'سلامة وجودة الغذاء',  'cat.svc.s2.p': 'تطبيق إجراءات HACCP، فحص دوري للمواد الخام، وانضباط كامل في سلسلة التبريد.',
      'cat.svc.s3.h': 'اللوجستيات والتوصيل', 'cat.svc.s3.p': 'أسطول مبرَّد، تتبّع زمني للشحنات، وتسليم منضبط لأبواب المواقع في الوقت المحدّد.',
      'cat.svc.s4.h': 'هندسة القوائم',       'cat.svc.s4.p': 'تصميم قوائم متوازنة غذائياً، تراعي التكلفة وتفضيلات الفئات الثقافية المختلفة.',
      'cat.svc.s5.h': 'إعاشة الفعاليات',     'cat.svc.s5.p': 'تغطية متكاملة للمؤتمرات والمناسبات الخاصة والحكومية، مع كادر ضيافة مدرَّب.',
      'cat.svc.s6.h': 'عقود التشغيل الطويلة','cat.svc.s6.p': 'إدارة كاملة لعقود الإعاشة في المشاريع والمنشآت متعدّدة المواقع، ضمن مؤشرات أداء واضحة.',

      'cat.q.eyebrow': 'طلب عرض سعر',
      'cat.q.title': 'احصل على <span class="foil">عرض سعر</span>',
      'cat.q.lede': 'املأ النموذج وسنوجّهك مباشرة إلى واتساب المدير العام مع تفاصيل طلبك جاهزة للإرسال.',
      'cat.q.name': 'الاسم',                   'cat.q.name.ph': 'اسمك الكريم',
      'cat.q.org': 'الجهة',                   'cat.q.org.ph': 'اسم الشركة أو المشروع',
      'cat.q.phone': 'الهاتف',                 'cat.q.phone.ph': '+966 5X XXX XXXX',
      'cat.q.email': 'البريد',                 'cat.q.email.ph': 'example@email.com',
      'cat.q.service': 'نوع الخدمة',
      'cat.q.service.opt1': 'مطبخ مركزي',
      'cat.q.service.opt2': 'إعاشة موقع',
      'cat.q.service.opt3': 'إعاشة فعالية',
      'cat.q.service.opt4': 'عقد تشغيل طويل',
      'cat.q.service.opt5': 'أخرى',
      'cat.q.meals': 'عدد الوجبات اليومية',     'cat.q.meals.ph': 'مثال: 500',
      'cat.q.loc': 'الموقع',
      'cat.q.loc.opt1': 'داخل المملكة',
      'cat.q.loc.opt2': 'خارج المملكة',
      'cat.q.city': 'المدينة',                 'cat.q.city.ph': 'مكة المكرمة، الرياض، ...',
      'cat.q.details': 'تفاصيل إضافية',         'cat.q.details.ph': 'مدّة العقد، نوع الموقع، أي ملاحظات خاصة...',
      'cat.q.send': 'إرسال الطلب عبر واتساب',
      'cat.q.hint': 'سيُفتح واتساب المدير العام مع رسالة تحتوي تفاصيل طلبك تلقائياً.',

      'cat.partners.eyebrow': 'المشاريع والشركاء',
      'cat.partners.title': 'شبكة <span class="foil">الشراكة</span>',
      'cat.partners.lede': 'يستند قسم الإعاشة إلى شبكة جيلكو من المشاريع والشركاء الاستراتيجيين — تابع المحفظة الكاملة في الموقع الرئيسي.',
      'cat.partners.cta': 'عرض المحفظة الكاملة',

      'cat.contact.lede': 'للاستفسار السريع، استخدم واتساب المدير العام في الأسفل. للتواصل الرسمي، استخدم البريد أو النموذج.',
      'cat.contact.phone.gm': 'هاتف المدير العام',
      'cat.contact.phone.ceo': 'هاتف الرئيس التنفيذي',
      'cat.contact.wa.k': 'واتساب',
      'cat.contact.wa.v': '<span class="phone-ltr">+966 53 515 1341</span> — مباشر',
      'cat.contact.form.sub': 'سيتم تحويلك إلى واتساب المدير العام مع رسالتك.',

      'cat.foot.about': 'ذراع الإعاشة والمطبخ المركزي في جيلكو — وجبات بمعايير شركة استثمارية مسؤولة، تخدم المشاريع داخل المملكة وخارجها.',
      'cat.foot.col1.head': 'هذه الصفحة',
      'cat.foot.col1.l1': 'من نحن',
      'cat.foot.col1.l2': 'لمن نقدم خدماتنا',
      'cat.foot.col1.l3': 'الباقات',
      'cat.foot.col1.l4': 'خدمات المطبخ',
      'cat.foot.col2.head': 'روابط',
      'cat.foot.col2.l1': 'طلب عرض سعر',
      'cat.foot.col2.l2': 'تواصل معنا',
      'cat.foot.col2.l3': 'الصفحة الرئيسية',
      'cat.foot.col2.l4': 'المشاريع',
    },

    en: {
      'meta.title.home': 'GELCO Investment & Development',
      'meta.title.catering': 'Catering & Central Kitchen | GELCO',
      'meta.desc.home': 'GELCO — Building Growth, Creating Opportunities. A Saudi investment & development house managing projects and restaurants.',
      'meta.desc.catering': 'GELCO — Catering & central kitchen services: meals of disciplined quality for project sites, facilities and events, inside and outside the Kingdom.',

      'nav.home': 'Home',
      'nav.about': 'About',
      'nav.services': 'Services',
      'nav.projects': 'Projects',
      'nav.why': 'Why GELCO',
      'nav.contact': 'Contact',
      'nav.catering': 'Catering & Central Kitchen',
      'nav.backHome': 'Back to Home',
      'nav.quote': 'Request a Quote',

      'home.hero.title': 'We Build <span class="foil">Growth</span> & Create <span class="foil">Opportunities</span>',
      'home.hero.motto': 'BUILDING GROWTH — CREATING OPPORTUNITIES',
      'home.hero.lede': 'A Saudi investment & development house specializing in commercial development, project management and restaurant operations — based in Makkah, building distinctive opportunities and strategic partnerships.',
      'home.hero.cta1': 'Request a Partnership',
      'home.hero.cta2': 'About Us',
      'home.scroll': 'SCROLL',

      'stats.l1': 'Investment Sectors',
      'stats.l2': 'Corporate Values',
      'stats.l3': 'Quality Commitment',
      'stats.l4': 'Reaching Across the Kingdom',

      'about.eyebrow': 'ABOUT — Who We Are',
      'about.title': 'Partners in Your <span class="foil">Growth Journey</span>',
      'about.big': 'GELCO is a Saudi house specializing in investment, commercial development, and the management of projects and restaurants.',
      'about.body': 'We deliver innovative investment solutions and successful partnerships that contribute to economic growth and sustainable value — moving from Makkah out across the regions of the Kingdom.',
      'about.vision.title': 'Our Vision',
      'about.vision.body': 'To be a leading Saudi company in investment and commercial development.',
      'about.mission.title': 'Our Mission',
      'about.mission.body': 'To deliver high-quality projects and services that drive success for our partners.',

      'services.eyebrow': 'SERVICES — What We Do',
      'services.title': 'Integrated Solutions <span class="foil">for Every Opportunity</span>',
      'services.lede': 'A service stack that covers the full investment cycle — from spotting the opportunity to operating and growing it.',
      'services.s1.h': 'Commercial Investment',
      'services.s1.p': 'Investing in and developing promising ventures, turning them into sustainable success stories with growing returns.',
      'services.s2.h': 'Restaurant Operations',
      'services.s2.p': 'Managing and operating food brands to high quality standards with an excellent guest experience.',
      'services.s3.h': 'Real Estate Development',
      'services.s3.p': 'Studying and developing real estate opportunities into investment assets with appreciating value.',
      'services.s4.h': 'Strategic Partnerships',
      'services.s4.p': 'Building strategic partnerships with investors and entrepreneurs to maximize returns and broaden impact.',

      'projects.eyebrow': 'PORTFOLIO — Our Projects',
      'projects.title': 'A Portfolio of <span class="foil">Distinctive Opportunities</span>',
      'projects.p1.h': 'Mathaq Restaurant Chain',
      'projects.p1.p': 'A food brand under integrated management and operation',
      'projects.p2.h': 'Commercial Ventures',
      'projects.p2.p': 'Active investments delivering steady returns',
      'projects.p3.h': 'Future Projects',
      'projects.p3.p': 'Opportunities under development within our expansion plan',

      'growth.eyebrow': 'PHILOSOPHY — How We Think',
      'growth.title': 'Real opportunity <span class="foil">is built, not awaited.</span>',
      'growth.body': 'We read the market, study the opportunity, and build value that compounds over time. Every investment decision at GELCO is a calculated step in a long-term growth journey.',
      'growth.cta': 'Discover Our Approach',
      'growth.chart.label': 'GROWTH',

      'why.eyebrow': 'WHY GELCO',
      'why.title': 'What <span class="foil">sets us apart</span>',
      'why.w1.h': 'Investment & Management Expertise', 'why.w1.p': 'A team with deep experience in managing investments and leading projects to success.',
      'why.w2.h': 'Trusted Partnerships',              'why.w2.p': 'Strategic relationships built on trust and transparency with a select circle of partners.',
      'why.w3.h': 'Integrated Solutions',              'why.w3.p': 'A complete service stack covering the investment cycle from planning to operations.',
      'why.w4.h': 'Professional Team',                 'why.w4.p': 'Specialized talent operating as one unit to deliver on our partners’ objectives.',
      'why.w5.h': 'Quality Commitment',                'why.w5.p': 'Strict standards in every detail, producing results worthy of our partners’ ambition.',
      'why.w6.h': 'Sustainable Growth Vision',         'why.w6.p': 'Considered investment decisions targeting long-term value.',

      'partner.title': 'Have an opportunity or capital <span class="foil">looking for the right partner?</span>',
      'partner.body': 'We build strategic partnerships that turn ambition into tangible success. Let’s create the next opportunity together.',
      'partner.cta': 'Start a Partnership',

      'contact.eyebrow': 'CONTACT — Let’s Talk',
      'contact.title': 'Let’s Start the <span class="foil">Conversation</span>',
      'contact.phone.k': 'PHONE',
      'contact.email.k': 'EMAIL',
      'contact.location.k': 'LOCATION',
      'contact.location.v': '2210 Al Masjid Al Haram Rd, Al Mursalat, Makkah 24247, Saudi Arabia',
      'contact.map': 'View on Google Maps',
      'contact.form.title': 'Send us a Message',
      'contact.form.sub': 'Our team will reach out as soon as possible.',
      'contact.form.name': 'NAME',
      'contact.form.name.ph': 'Your name',
      'contact.form.phone': 'PHONE',
      'contact.form.phone.ph': 'Mobile number',
      'contact.form.email': 'EMAIL',
      'contact.form.email.ph': 'example@email.com',
      'contact.form.message': 'MESSAGE',
      'contact.form.message.ph': 'How can we help you?',
      'contact.form.send': 'Send via WhatsApp',

      // ----- PRIVACY -----
      'privacy.agree.pre': 'I agree to the ',
      'privacy.agree.link': 'Privacy Policy',
      'privacy.agree.post': ' of GELCO.',
      'privacy.modal.title': 'Privacy Policy',
      'privacy.modal.intro': 'At GELCO we respect your privacy and only ask for the basic information needed to reach you on WhatsApp.',
      'privacy.modal.collect.h': 'What we collect',
      'privacy.modal.collect.b': 'We only collect: your name, phone number, email, and the text of your message. No additional data is gathered automatically.',
      'privacy.modal.use.h': 'How we use it',
      'privacy.modal.use.b': 'This data is used solely to reply to your inquiry or request over WhatsApp. It is never sold or shared with third parties for marketing.',
      'privacy.modal.wa.h': 'WhatsApp handoff',
      'privacy.modal.wa.b': 'When you press the send button you are redirected to WhatsApp with a message containing your details. From that moment onward, the conversation is governed by WhatsApp / Meta’s privacy policy, not ours.',
      'privacy.modal.rights.h': 'Your rights',
      'privacy.modal.rights.b': 'You may request deletion or correction of your data at any time by emailing: info@gelco.sa',
      'privacy.modal.close': 'Close',
      'privacy.alert': 'Please accept the Privacy Policy before sending.',
      'footer.legal': 'Privacy Policy',

      'footer.about': 'A Saudi investment & development house managing projects and restaurants, building distinctive opportunities and strategic partnerships.',
      'footer.col1.head': 'COMPANY',
      'footer.col2.head': 'LINKS',
      'footer.col3.head': 'CONTACT',
      'footer.col2.l1': 'Philosophy',
      'footer.col2.l2': 'Start a Partnership',
      'footer.col3.location': '2210 Al Masjid Al Haram Rd, Al Mursalat, Makkah 24247, Saudi Arabia',
      'footer.brand': 'GELCO Investment & Development',
      'footer.copyright': '· BUILDING GROWTH · CREATING OPPORTUNITIES',

      'cat.hero.eyebrow': 'CATERING & CENTRAL KITCHEN',
      'cat.hero.title': '<span class="foil">Reliable</span> catering. <span class="foil">World-class</span> central kitchen.',
      'cat.hero.lede': 'Your partner in delivering meals of disciplined quality to project sites, facilities and events — inside and outside the Kingdom, run directly by our field teams.',
      'cat.hero.cta1': 'Request a Quote',
      'cat.hero.cta2': 'View Packages',

      'cat.about.eyebrow': 'ABOUT',
      'cat.about.title': 'GELCO’s <span class="foil">Catering</span> Arm',
      'cat.about.lede': 'A specialized arm carrying GELCO’s investment discipline into catering operations that are ready to scale and trusted day-to-day.',
      'cat.about.body': 'Our Catering & Central Kitchen division was founded on a simple, unwavering idea: that the meal reaching the worker on site, the visitor at an event, or the employee at HQ should reflect the standards of a responsible investment company, not a standard kitchen operation. We serve from <span style="color:var(--gold)">Makkah</span> outward to cities across the Kingdom — and from inside the country to regional projects abroad — through field teams and a disciplined supply chain that starts with vendor selection and ends at the final port: <span style="color:var(--gold)">the customer’s table</span>.',

      'cat.leaders.eyebrow': 'LEADERSHIP',
      'cat.leaders.title': '<span class="foil">Trusted</span> Leadership',
      'cat.leaders.lede': 'Real people standing behind every operational decision — directly reachable by clients and partners.',
      'cat.leaders.gm.name': 'Masoud Abu Faris',
      'cat.leaders.gm.role': 'GENERAL MANAGER',
      'cat.leaders.gm.bio': 'General Manager of the GELCO group and the executive in charge of the Catering & Central Kitchen division — the first point of contact for clients and partners.',
      'cat.leaders.ceo.name': 'Ataa Allah Abu Abdulaziz',
      'cat.leaders.ceo.role': 'CEO',
      'cat.leaders.ceo.bio': 'Chief Executive of the GELCO group, leading the strategic direction for investment and development and setting top-level policy for the catering arm.',
      'cat.leaders.location': '2210 Al Masjid Al Haram Rd, Al Mursalat, Makkah 24247, Saudi Arabia',
      'cat.leaders.wa': 'Chat on WhatsApp',

      'cat.serve.eyebrow': 'WHO WE SERVE',
      'cat.serve.title': 'Partners along the <span class="foil">Journey</span>',
      'cat.serve.lede': 'We serve a broad range of clients — from the first-time founder launching an idea, to large entities contracting site-wide meal supply, both inside and outside the Kingdom.',
      'cat.serve.t1.h': 'New Project Owners',
      'cat.serve.t1.p': 'We walk a project from its earliest idea — kitchen layout, menu design, team onboarding, licensing — and hand it over ready to operate.',
      'cat.serve.t1.b': 'Inside & outside the Kingdom',
      'cat.serve.t2.h': 'Investment Seekers',
      'cat.serve.t2.p': 'Feasibility studies and operational partnerships in catering and restaurants under clear risk/return frameworks.',
      'cat.serve.t2.b': 'Strategic partnerships',
      'cat.serve.t3.h': 'Restaurant Investors',
      'cat.serve.t3.p': 'Operating and managing existing restaurant brands and launching new units under one unified quality framework, under the GELCO umbrella.',
      'cat.serve.t3.b': 'Operating & management',
      'cat.serve.t4.h': 'Meal-Supply Clients',
      'cat.serve.t4.p': 'Meal-supply contracts for construction sites, government facilities and events — with strict commitment to timing and quality.',
      'cat.serve.t4.b': 'Long-term contracts',

      'cat.pkg.eyebrow': 'PACKAGES',
      'cat.pkg.title': 'Catering <span class="foil">Packages</span>',
      'cat.pkg.lede': 'Three packages designed to cover different operational scales, with flexibility to customize for each client’s site profile.',
      'cat.pkg.p1.tier': 'BASIC',
      'cat.pkg.p1.h': 'Site Catering',
      'cat.pkg.p1.scale': 'Up to 200 meals/day',
      'cat.pkg.p1.desc': 'For small construction sites and field crews. Meals with disciplined quantity and nutrition, delivered daily.',
      'cat.pkg.p1.l1': 'Two main meals + snack',
      'cat.pkg.p1.l2': 'Rotating weekly menus',
      'cat.pkg.p1.l3': 'Delivery in refrigerated vehicles',
      'cat.pkg.p1.l4': 'Field supervisor on site',
      'cat.pkg.p2.tier': 'STANDARD',
      'cat.pkg.p2.h': 'Central Kitchen',
      'cat.pkg.p2.scale': 'Up to 1,500 meals/day',
      'cat.pkg.p2.desc': 'For mid-size facilities, camps and long-term operating contracts. Central production with distribution to multiple sites.',
      'cat.pkg.p2.l1': 'Three meals daily + beverages',
      'cat.pkg.p2.l2': 'Seasonal menus with cultural variety',
      'cat.pkg.p2.l3': 'In-house HACCP procedures applied',
      'cat.pkg.p2.l4': 'Monthly client reports',
      'cat.pkg.p2.l5': 'Backup line for emergencies',
      'cat.pkg.p3.tier': 'PREMIUM',
      'cat.pkg.p3.h': 'Large Projects & Events',
      'cat.pkg.p3.scale': '+1,500 meals / special events',
      'cat.pkg.p3.desc': 'For large-scale projects, government camps and distinctive events. Mobile kitchen and dedicated executive chef.',
      'cat.pkg.p3.l1': 'Multi-track menus (specialty / vegetarian / international)',
      'cat.pkg.p3.l2': 'Executive chef and quality controller',
      'cat.pkg.p3.l3': 'Mobile kitchen when needed',
      'cat.pkg.p3.l4': 'Hospitality protocol for events',
      'cat.pkg.p3.l5': '24/7 operational support',
      'cat.pkg.note': 'All packages are customizable — reach out to the General Manager to tailor a proposal that matches your need.',
      'cat.pkg.featured': 'Most requested',

      'cat.svc.eyebrow': 'CENTRAL KITCHEN SERVICES',
      'cat.svc.title': 'What <span class="foil">We Deliver</span>',
      'cat.svc.lede': 'From kitchen to table — a consistent chain of operations that protects quality at every stage.',
      'cat.svc.s1.h': 'Meal Preparation & Production', 'cat.svc.s1.p': 'Central kitchens equipped to industrial standards, with throughput that scales to contract size.',
      'cat.svc.s2.h': 'Food Safety & Quality',        'cat.svc.s2.p': 'HACCP procedures applied, periodic raw-material inspection and full cold-chain discipline.',
      'cat.svc.s3.h': 'Logistics & Delivery',         'cat.svc.s3.p': 'Refrigerated fleet, time-tracked shipments and disciplined on-time delivery to site gates.',
      'cat.svc.s4.h': 'Menu Engineering',             'cat.svc.s4.p': 'Nutritionally balanced menus designed with cost discipline and cultural preferences in mind.',
      'cat.svc.s5.h': 'Event Catering',               'cat.svc.s5.p': 'End-to-end coverage for conferences, private and government events, with a trained hospitality crew.',
      'cat.svc.s6.h': 'Long-Term Operating Contracts','cat.svc.s6.p': 'Full management of catering contracts across multi-site projects and facilities under clear KPIs.',

      'cat.q.eyebrow': 'REQUEST A QUOTE',
      'cat.q.title': 'Get a <span class="foil">Quote</span>',
      'cat.q.lede': 'Fill in the form and you’ll be sent directly to the General Manager’s WhatsApp with your details ready to send.',
      'cat.q.name': 'NAME',                'cat.q.name.ph': 'Your name',
      'cat.q.org': 'ORGANIZATION',         'cat.q.org.ph': 'Company or project name',
      'cat.q.phone': 'PHONE',               'cat.q.phone.ph': '+966 5X XXX XXXX',
      'cat.q.email': 'EMAIL',               'cat.q.email.ph': 'example@email.com',
      'cat.q.service': 'SERVICE',
      'cat.q.service.opt1': 'Central kitchen',
      'cat.q.service.opt2': 'Site catering',
      'cat.q.service.opt3': 'Event catering',
      'cat.q.service.opt4': 'Long-term operating contract',
      'cat.q.service.opt5': 'Other',
      'cat.q.meals': 'MEALS PER DAY',       'cat.q.meals.ph': 'e.g. 500',
      'cat.q.loc': 'LOCATION',
      'cat.q.loc.opt1': 'Inside KSA',
      'cat.q.loc.opt2': 'Outside KSA',
      'cat.q.city': 'CITY',                 'cat.q.city.ph': 'Makkah, Riyadh, ...',
      'cat.q.details': 'DETAILS',           'cat.q.details.ph': 'Contract length, site type, any special notes...',
      'cat.q.send': 'Send Request via WhatsApp',
      'cat.q.hint': 'The General Manager’s WhatsApp will open with a message containing your full request.',

      'cat.partners.eyebrow': 'PROJECTS & PARTNERS',
      'cat.partners.title': 'Our <span class="foil">Partner Network</span>',
      'cat.partners.lede': 'The Catering division leans on GELCO’s wider network of projects and strategic partners — see the full portfolio on the main site.',
      'cat.partners.cta': 'View the Full Portfolio',

      'cat.contact.lede': 'For quick questions, use the General Manager’s WhatsApp button below. For formal contact, use email or the form.',
      'cat.contact.phone.gm': 'PHONE / GM',
      'cat.contact.phone.ceo': 'PHONE / CEO',
      'cat.contact.wa.k': 'WHATSAPP',
      'cat.contact.wa.v': '<span class="phone-ltr">+966 53 515 1341</span> — direct',
      'cat.contact.form.sub': 'You’ll be redirected to the General Manager’s WhatsApp with your message.',

      'cat.foot.about': 'The Catering & Central Kitchen arm of GELCO — meals at the standards of a responsible investment company, serving projects inside and outside the Kingdom.',
      'cat.foot.col1.head': 'This Page',
      'cat.foot.col1.l1': 'About',
      'cat.foot.col1.l2': 'Who We Serve',
      'cat.foot.col1.l3': 'Packages',
      'cat.foot.col1.l4': 'Kitchen Services',
      'cat.foot.col2.head': 'Links',
      'cat.foot.col2.l1': 'Request a Quote',
      'cat.foot.col2.l2': 'Contact',
      'cat.foot.col2.l3': 'Home',
      'cat.foot.col2.l4': 'Projects',
    },
  };

  function apply(lang){
    const dict = T[lang] || T.ar;
    document.documentElement.lang = lang;
    document.documentElement.dir  = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.classList.toggle('lang-en', lang === 'en');

    // textContent
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const v = dict[el.dataset.i18n];
      if (v != null) el.textContent = v;
    });
    // innerHTML (rich strings with <span class="foil">)
    document.querySelectorAll('[data-i18n-html]').forEach(el => {
      const v = dict[el.dataset.i18nHtml];
      if (v != null) el.innerHTML = v;
    });
    // attributes: data-i18n-attr="key|attrName"
    document.querySelectorAll('[data-i18n-attr]').forEach(el => {
      const parts = (el.dataset.i18nAttr || '').split('|');
      if (parts.length !== 2) return;
      const v = dict[parts[0]];
      if (v != null) el.setAttribute(parts[1], v);
    });
    // <title>
    const tk = document.querySelector('meta[name="i18n-title"]');
    if (tk && dict[tk.content]) document.title = dict[tk.content];
    // toggle button state
    document.querySelectorAll('.lang-toggle button').forEach(b => {
      b.classList.toggle('on', b.dataset.l === lang);
    });
    try { localStorage.setItem('gelco.lang', lang); } catch(_){}
  }

  const initial = (() => {
    try { return localStorage.getItem('gelco.lang') || 'ar'; } catch(_) { return 'ar'; }
  })();

  // Apply on script load so the AR default flips to EN before paint if persisted
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => apply(initial));
  } else {
    apply(initial);
  }

  // Wire toggle buttons
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.lang-toggle button[data-l]');
    if (!btn) return;
    apply(btn.dataset.l);
  });

  // Expose for debugging
  window.__gelcoI18n = { apply, T };
})();
