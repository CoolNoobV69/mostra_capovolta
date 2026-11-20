/* =====================================================================
   CONTENUTI DEL SITO  —  è l'UNICO file da modificare per i testi.
   - Le parti con [DA COMPLETARE] vanno riscritte dalla classe con parole proprie.
   - I fatti storici qui sotto sono quelli verificati sulle fonti S1-S5:
     riscriveteli comunque con parole vostre e controllateli sulla fonte.
   - Nelle frasi dei messaggi, le parti tra {{id|testo}} diventano
     frasi cliccabili (meccanismi da smascherare).
   - Il gruppo "gli abitanti di Via del Molo" è INVENTATO di proposito:
     mostra la struttura del meccanismo senza diffondere odio reale.
   ===================================================================== */
window.CONTENT = {
  meta: {
    title: "La mostra capovolta",
    subtitle: "Der Ewige Jude, 1937 · 2027",
    school: "[NOME SCUOLA · CLASSE/I]",
    gateNote: "Questo sito è progettato per essere capito, non diffuso: non ha pulsanti di condivisione, commenti né sistemi di tracciamento.",
    traccia: "Traccia secondaria di II grado, Concorso «I giovani ricordano la Shoah» a.s. 2026/2027",
    footer: "Progetto didattico di [SCUOLA]. I messaggi della Stanza 2027 sono SIMULAZIONI DIDATTICHE scritte dalla classe su un gruppo inventato. Nessuna immagine propagandistica è riprodotta."
  },

  sources: [
    { id: "S1", text: "United States Holocaust Memorial Museum, Enciclopedia dell'Olocausto, «Definire il nemico» (Defining the Enemy)", url: "https://encyclopedia.ushmm.org/content/it/article/defining-the-enemy" },
    { id: "S2", text: "Bundeszentrale für politische Bildung, «Vor 80 Jahren: Die NS-Propagandaausstellung \"Der ewige Jude\" wird eröffnet»", url: "https://www.bpb.de/politik/hintergrund-aktuell/258794/ns-propagandaausstellung" },
    { id: "S3", text: "Francesco Cassata, «La Difesa della razza». Politica, ideologia e immagine del razzismo fascista (Einaudi, 2008) [DA CONSULTARE]", url: "" },
    { id: "S4", text: "Il Post, «Leggi razziali fasciste» (5 settembre 2018)", url: "https://www.ilpost.it/2018/09/05/leggi-razziali-fasciste/" },
    { id: "S5", text: "Ministero dell'istruzione e del merito, Bando «I giovani ricordano la Shoah», a.s. 2026/2027", url: "" },
    { id: "S6", text: "[AGGIUNGERE: fonte primaria locale: archivio storico, biblioteca civica, registri della scuola]", url: "" }
  ],

  /* Sala 0: contesto (nessuna chiave) */
  sala0: {
    title: "Sala 0 · 8 novembre 1937",
    lead: "Monaco di Baviera. Si apre una mostra che insegna a vedere un nemico.",
    facts: [
      { text: "L'8 novembre 1937 viene inaugurata a Monaco la mostra «Der Ewige Jude» (L'ebreo errante).", src: "S2, S5" },
      { text: "Resta aperta fino a gennaio 1938 e registra 412.300 visitatori: più di 5.000 al giorno.", src: "S1" },
      { text: "Fa parte di una serie di mostre di propaganda del regime (le «Schandausstellungen») negli anni prima della guerra.", src: "S2" },
      { text: "Dalla mostra deriva un film con lo stesso titolo, uscito nel 1940.", src: "S2" },
      { text: "[DA COMPLETARE] Cosa sappiamo del percorso espositivo, dei pannelli e di chi la visitò, da fonti primarie.", src: "S6" }
    ],
    labels: {
      Ruolo: "Portare in uno spazio pubblico e in un evento di massa un messaggio politico d'odio.",
      Linguaggio: "Pregiudizi, stereotipi, caricature, falsità; antico antigiudaismo religioso mescolato al nuovo razzismo biologico (S5).",
      Strumento: "Una mostra aperta al pubblico, poi un film.",
      Finalità: "Secondo S1, la propaganda che demonizzava gli ebrei preparò la popolazione a misure sempre più dure, fino alle deportazioni e al genocidio."
    }
  },

  /* Sale 1-5: meccanismi, ciascuna sblocca una chiave */
  rooms: [
    {
      key: 1, title: "Sala 1 · Nominare il nemico",
      lead: "Prima si decide chi è «dentro» e chi è «fuori».",
      facts: [
        { text: "La propaganda nazista descrisse gli ebrei come un «corpo estraneo» che viveva a spese della nazione che li ospitava, ne avvelenava la cultura e ne prendeva l'economia.", src: "S1" },
        { text: "Un gruppo coeso si costruisce anche definendo chi ne deve restare escluso.", src: "S1" }
      ],
      labels: {
        Ruolo: "Creare una linea di confine tra «noi» e «loro».",
        Linguaggio: "Accuse generiche rivolte a un intero gruppo.",
        Strumento: "Manifesti, giornali, mostre, discorsi. [DA COMPLETARE con esempi dalle fonti]",
        Finalità: "Rendere pensabile l'esclusione."
      },
      message: "{{a|Quelli di Via del Molo non sono come noi.}} Abitano nel nostro quartiere, ma non sono del quartiere. {{b|Prendono tutto e non danno niente.}}",
      reveals: {
        a: "Separare «noi» da «loro»: dire chi è estraneo è il primo passo. Nel 1937: il «corpo estraneo» nella nazione (S1).",
        b: "Accusa economica: «vivono a nostre spese». Nel 1937: si diceva che gli ebrei vivessero a spese della nazione e ne prendessero l'economia (S1)."
      },
      then: "Nel 1937 l'accusa era di Stato; oggi il messaggio nasce spesso dal basso. [DA COMPLETARE con fonti]",
      diff: "Chi decide oggi quale gruppo è «estraneo»? Esiste un'autorità unica come nel 1937?"
    },
    {
      key: 2, title: "Sala 2 · Togliere l'umano",
      lead: "Chi è paragonato a un animale o a una malattia non ha più bisogno di essere ascoltato.",
      facts: [
        { text: "Una sequenza del film «Der Ewige Jude» (1940) paragona gli ebrei a ratti portatori di malattie che invadono il continente.", src: "S1" },
        { text: "Nella Polonia occupata la propaganda presentò i ghetti come misura sanitaria: gli ebrei erano dipinti come minaccia per la salute pubblica da mettere in quarantena.", src: "S1" },
        { text: "Per scelta del progetto, qui NON si riproducono immagini: sono descritte e commentate.", src: "" }
      ],
      labels: {
        Ruolo: "Rendere accettabile la violenza prima che avvenga.",
        Linguaggio: "Metafore di parassiti e malattia.",
        Strumento: "Film, immagini, stampa.",
        Finalità: "Far percepire le misure contro un gruppo come igiene o difesa necessaria."
      },
      message: "{{a|Stanno infestando le nostre strade.}} Dove arrivano, {{b|il quartiere si ammala.}} {{c|Qualcuno deve pur fare qualcosa.}}",
      reveals: {
        a: "Metafora animale/parassitaria: un gruppo di persone ridotto a infestazione. Nel 1937-40: i ratti nel film (S1).",
        b: "Metafora della malattia: il gruppo diventa un contagio. Nei ghetti: «minaccia sanitaria» da isolare (S1).",
        c: "Appello all'azione: dalla metafora alla «misura necessaria». Si prepara il passaggio dall'insulto alla decisione."
      },
      then: "[DA COMPLETARE] Dove compaiono oggi metafore simili? Cosa cambia quando sono meme o frasi brevi?",
      diff: "Cosa cambia quando il messaggio è un'immagine che circola in pochi secondi?"
    },
    {
      key: 3, title: "Sala 3 · Mescolare i linguaggi",
      lead: "Vecchi pregiudizi e nuova «scienza»: due voci per un solo messaggio. In Italia, dal 1938.",
      facts: [
        { text: "Il bando ricorda che la propaganda mescolava il nuovo antisemitismo razzista con le argomentazioni dell'antigiudaismo religioso.", src: "S5" },
        { text: "Il 15 luglio 1938 il «Giornale d'Italia» pubblica il Manifesto della razza, presentato come opera di studiosi.", src: "S4" },
        { text: "Il 5 agosto 1938 esce il primo numero de «La difesa della razza», che contiene il Manifesto; la rivista arriva a 118 numeri, fino al 20 giugno 1943, e usa grafica, fotografie, vignette e fotomontaggi.", src: "S3 [DA VERIFICARE]" },
        { text: "Il 5 settembre 1938 un decreto allontana studenti e docenti ebrei dalle scuole.", src: "S4" }
      ],
      labels: {
        Ruolo: "Dare al pregiudizio una veste di serietà.",
        Linguaggio: "Termini pseudoscientifici, appello a «esperti», discorsi sul «sangue» e sul «carattere».",
        Strumento: "Manifesto, rivista, decreti.",
        Finalità: "Trasformare un'opinione in norma."
      },
      message: "{{a|Lo dicono gli esperti.}} {{b|È nel loro carattere, da sempre:}} basta leggere {{c|quello studio che gira in rete.}}",
      reveals: {
        a: "Falsa autorità: si invocano «gli esperti» senza nome. Nel 1938: il Manifesto della razza firmato da «studiosi» (S4).",
        b: "Essenzialismo: una caratteristica attribuita a tutto un gruppo «per natura». Nel 1938: il razzismo biologico.",
        c: "Prova senza fonte: uno «studio» che nessuno può verificare. Nel 1938: la rivista prometteva di mostrare che la scienza sosteneva il razzismo (S3)."
      },
      then: "[DA COMPLETARE] Come si riconosce oggi uno «studio» che non lo è? Quali segnali?",
      diff: "Oggi chi può verificare una fonte? Con quali strumenti?"
    },
    {
      key: 4, title: "Sala 4 · Renderlo normale",
      lead: "Quello che si vede ogni giorno smette di scandalizzare.",
      facts: [
        { text: "I nazisti controllarono le istituzioni culturali, musei compresi, creando nuove occasioni per diffondere propaganda antisemita.", src: "S1" },
        { text: "Esistevano libri antisemiti per bambini pubblicati dalla casa editrice Der Stürmer, come «Der Giftpilz».", src: "S1" },
        { text: "Cartelli del tipo «qui non vogliamo gli ebrei» comparivano nelle strade; il giornale «Der Stürmer» era esposto in bacheche pubbliche.", src: "S1" }
      ],
      labels: {
        Ruolo: "Far diventare ordinario ciò che era inaccettabile.",
        Linguaggio: "Ripetizione, battute, slogan, immagini semplici.",
        Strumento: "Musei, libri per bambini, cartelli, giornali nelle bacheche.",
        Finalità: "«Normalizzare» razzismo, persecuzioni e infine lo sterminio (S5)."
      },
      message: "{{a|Era solo una battuta.}} {{b|Lo fanno tutti,}} basta vedere cosa si scrive. {{c|Ridiamoci su.}}",
      reveals: {
        a: "Lo scherzo come scudo: se qualcuno protesta, «non sa stare allo scherzo».",
        b: "Norma sociale apparente: se lo fanno tutti, allora è normale. Nel 1937: cartelli, bacheche e libri ovunque (S1).",
        c: "Abitudine: la soglia dello scandalo si abbassa a forza di ripetizione."
      },
      then: "[DA COMPLETARE] Dove vedete oggi lo stesso effetto di ripetizione?",
      diff: "La ripetizione di oggi è pianificata da un regime o prodotta da molti utenti?"
    },
    {
      key: 5, title: "Sala 5 · Parlare a ciascuno",
      lead: "Lo stesso messaggio, con toni diversi per pubblici diversi.",
      facts: [
        { text: "Dopo il 1933 i responsabili della propaganda crearono messaggi adattati a pubblici diversi, compresi i tanti tedeschi che non erano nazisti.", src: "S1" },
        { text: "Per i ceti medi istruiti, offesi dalle caricature più rozze, usarono un linguaggio e un punto di vista sempre antisemiti, ma più sottili.", src: "S1" }
      ],
      labels: {
        Ruolo: "Raggiungere anche chi rifiuta i toni più rozzi.",
        Linguaggio: "Più sottile, apparentemente ragionevole.",
        Strumento: "Stampa, discorsi, testi diversi per pubblici diversi.",
        Finalità: "Allargare il consenso passivo."
      },
      message: "{{a|Non ho nulla contro di loro, ma}} {{b|io faccio solo domande:}} chi decide davvero nel nostro quartiere? {{c|Sono domande legittime, no?}}",
      reveals: {
        a: "Il «non ho nulla contro, ma» apre la porta al pregiudizio dopo averlo negato.",
        b: "L'insinuazione: non si afferma, si lascia concludere al pubblico.",
        c: "Legittimazione preventiva: chi risponde sembra voler zittire. Nel 1937: toni più sottili per i ceti istruiti (S1)."
      },
      then: "[DA COMPLETARE] Come cambia lo stesso messaggio per due pubblici diversi oggi?",
      diff: "Quanto contano oggi i sistemi che personalizzano ciò che vediamo?"
    }
  ],

  /* Sala 6: confronto 1937 <-> 2027 */
  sala6: {
    title: "Sala 6 · 1937 ↔ 2027",
    lead: "Sposta il cursore: a sinistra il meccanismo nel 1937, a destra la sua eco simulata. Sotto: cosa NON è uguale.",
    notEqual: [
      "[DA COMPLETARE con fonti] Velocità: da settimane di stampa a pochi secondi.",
      "[DA COMPLETARE con fonti] Chi produce: un regime con il monopolio dei mezzi contro tanti utenti, anche anonimi.",
      "[DA COMPLETARE con fonti] Intelligenza artificiale: cosa cambia nel costo e nella credibilità dei falsi?",
      "[DA COMPLETARE con fonti] Le risposte: leggi e sistemi di segnalazione oggi; nel 1937 leggi a favore della discriminazione.",
      "Fonti da consultare: Strategia UE contro l'antisemitismo 2021-2030 e Strategia nazionale 2025-2029 (citate nel bando)."
    ],
    fakesTitle: "Il falso innocuo",
    fakesLead: "Per capire come funziona un falso credibile, la classe ne ha costruiti alcuni su temi innocui. Quale è vero?",
    fakes: [
      { caption: "[DA COMPLETARE] Foto della palestra allagata", img: "", isFake: true, explain: "Creata con IA dalla classe con [STRUMENTO]. Indizi: [DA COMPLETARE]." },
      { caption: "[DA COMPLETARE] Foto del cortile della scuola", img: "", isFake: false, explain: "Scattata dalla classe il [DATA]." },
      { caption: "[DA COMPLETARE] Screenshot di un finto articolo", img: "", isFake: true, explain: "Costruito dalla classe. Indizi: [DA COMPLETARE]." }
    ]
  },

  /* Uscita: la Pausa */
  uscita: {
    title: "Uscita · La Pausa",
    lead: "Prima di condividere qualsiasi cosa, fermati dieci secondi.",
    questions: [
      "Chi l'ha fatto? Si può verificare?",
      "A chi parla? Chi è il pubblico a cui si rivolge?",
      "Cosa vuole farmi sentire verso chi?",
      "Cosa nasconde o non dice?",
      "Cosa succede se lo diffondo?"
    ],
    pledge: "[DA COMPLETARE] L'impegno scritto dalla classe, in poche righe.",
    credits: "[DA COMPLETARE] Classi, docenti, ruoli (nomi di minori solo se autorizzati)."
  },

  /* Sala 7: facoltativa, la stanza che nessun altro ha */
  territorio: {
    enabled: true,
    title: "Sala 7 · Nel nostro territorio",
    lead: "[DA COMPLETARE] Cosa succedeva qui nel 1938-1943?",
    body: [
      "[DA COMPLETARE] Cosa raccontavano i giornali locali, la scuola, il comune. Esempio: i registri scolastici 1938-43, ricerche in archivio storico o biblioteca civica.",
      "Citate sempre: titolo, data, collocazione archivistica."
    ]
  }
};
