export type Memory = {
  id: string;
  title: string;
  date?: string;
  caption: string;
  story: string;
  image?: string;
  imagePosition?: string;
};

export type QuizQuestion = {
  question: string;
  answers: {
    text: string;
    remark: string;
    isCorrect?: boolean;
  }[];
};

export type LoveNote = {
  label: string;
  title: string;
  body: string;
};

export type PookieConfig = {
  herName: string;
  nickname: string;
  boyfriendName: string;
  birthdayDate: string;
  relationshipStartDate: string;
  introMessage: string;
  welcomeMessage: string;
  birthdayLetter: string;
  memories: Memory[];
  loveNotes: LoveNote[];
  quizQuestions: QuizQuestion[];
  futurePlans: string[];
  promises: string[];
  media: {
    backgroundMusic?: string;
    surpriseVideo?: string;
    surpriseAudio?: string;
  };
  surpriseType: "video" | "audio" | "bucketList";
  birthdayEntrance: {
    enabled: boolean;
    secretWord: string;
    secretMeaning: string;
    hintOne: string;
    hintTwo: string;
    soundtrack: string;
    sceneDurations: [number, number, number, number, number];
    showRoyalAnnouncement: boolean;
    allowSkipping: boolean;
    allowReplay: boolean;
  };
  birthdayFlyer: {
    image: string;
    downloadName: string;
  };
};

/**
 * Personalise the whole experience here.
 *
 * Put local files in /public/images, /public/audio, and /public/video, then use
 * paths such as "/images/our-first-date.jpg". Empty media paths are hidden.
 * Keep a memory's image empty to show the intentional photo placeholder.
 */
export const pookieConfig: PookieConfig = {
  herName: "Roseline",
  nickname: "Pookie Bear 💕",
  boyfriendName: "Wizzy",
  birthdayDate: "2026-11-25",
  relationshipStartDate: "",
  introMessage: "A tiny corner of the internet, made entirely for you.",
  welcomeMessage:
    "Of all the people in this enormous world, somehow I got lucky enough to know you.",
  birthdayLetter: `My love,

Sometimes I wish I could pause time.

Not because I want the world to stop moving, but because there are little moments with you that I wish I could hold onto for just a little longer.

The conversations. The laughter. The random jokes. The ordinary moments that somehow become special.

I don't think you always realise how much your presence means to me. And maybe I don't always say it enough.

But I notice you. I appreciate you. And I am genuinely grateful that our lives crossed paths.

Today is your birthday, and more than anything, I want you to be happy. I want you to experience the kind of joy that makes your heart feel lighter.

I want your dreams to become stories you can proudly tell. I want you to discover even more beautiful things about yourself.

And I hope this new year of your life brings you peace, growth, laughter, fulfilment, and so many reasons to smile.

Thank you for being you. Thank you for the memories. Thank you for the beautiful moments we've shared.

I hope we get to make many more.

Happy birthday, my love. You deserve beautiful things.

And if this little website has made you smile even once, then every minute I spent creating it was worth it.

I love you.

Forever your biggest fan.`,
  memories: [
    {
      id: "beginning",
      title: "The Beginning",
      caption: "Add the moment where your story began.",
      story:
        "I remember the first time I lay on your chest and felt your heartbeat. I remember the first time you stole my first kiss, NOSTALGIA!!!!. I remember the first time you held my hand and I felt like I was home. I remember the first time you said 'I love you' and I felt like I was the luckiest person in the world. I remember the first time we cried together and held each other close (I still won't forgive you for this 😁). I remember the number of times we've said goodbye and felt like our hearts were breaking. I remember it all",
      image: "/images/long-time-us.jpeg",
      imagePosition: "center",
    },
    {
      id: "laughter",
      title: "That Day We Couldn’t Stop Laughing",
      caption: "Some laughter deserves its own museum wall.",
      story:
        "This day was a funny one. Remember you started complaining about how far the pleasure park was, and forgetting that you were the one who suggested we go there in the first place. The most exicting part of this place was the roller coaster ride, my God!!! you couldn't stop shouting. It was truly fun and you were there to share that memory with me.",
      image: "/images/ppk igwuruta side.jpeg",
      imagePosition: "center",
    },
    {
      id: "favourite",
      title: "My Favourite Picture of You",
      caption: "Add a photo that always makes you pause.",
      story:
        "This is one of my favourite picuters of us, even now I know you're still smiling looking at this - That wall behind us, that was the dim light in the dark that helped us find our way back to each other, we had almost lost each other.",
      image: "/images/me-and-you.jpg",
      imagePosition: "center",
    },
    {
      id: "The Kids in us",
      title: "The Kids in Us",
      caption: "The ordinary moments are often the magic ones.",
      story:
        "This picture here, I know it's not of us, but it speaks to my soul and always reminds me of us while growing up - we've really come a long way mama, and I know we have a long way to go, but I know we'll get there together.",
      image: "/images/kids-in-us.jpg",
      imagePosition: "center",
    },
  ],
  quizQuestions: [
    {
      question: "Who exactly is Pookie Bear 💕?",
      answers: [
        {
          text: "A suspiciously cute stranger",
          remark:
            "Stranger? Wizzy would recognise that face in every universe.",
        },
        {
          text: "Roseline",
          remark:
            "Correct. Identity confirmed: Roseline, also known as Wizzy’s Pookie Bear. 💕",
          isCorrect: true,
        },
        {
          text: "An international celebrity",
          remark: "Honestly, the fame is only taking its time.",
        },
        {
          text: "The Examination Board chairwoman",
          remark: "A powerful appointment. The board is already afraid of you.",
        },
      ],
    },
    {
      question: "What is Roseline’s favourite food?",
      answers: [
        {
          text: "Whatever she loved last month",
          remark: "That favourite has probably completed its term in office.",
        },
        {
          text: "Whatever she is currently craving",
          remark:
            "Correct. Her current craving has been officially promoted to favourite. Terms and conditions may change tomorrow.",
          isCorrect: true,
        },
        {
          text: "Anything Wizzy buys",
          remark: "A politically excellent answer. Wizzy supports this policy.",
        },
        {
          text: "She has signed a lifetime contract with one meal",
          remark:
            "Roseline? A permanent food contract? The evidence says otherwise.",
        },
      ],
    },
    {
      question:
        "When Roseline tells Wizzy, “I forgive you,” what usually happened?",
      answers: [
        {
          text: "Wizzy committed an unforgivable offence",
          remark: "The tribunal requested evidence. None was found.",
        },
        {
          text: "Absolutely nothing",
          remark:
            "Correct—but please allow the forgiver to enjoy the moral high ground.",
          isCorrect: true,
        },
        {
          text: "Roseline is graciously being the bigger person",
          remark:
            "Exactly. A heroic act of forgiveness for an offence that may not exist.",
        },
        {
          text: "Both B and C",
          remark:
            "The most legally accurate answer. Case dismissed, Roseline still wins.",
        },
      ],
    },
    {
      question: "Where did Roseline and Wizzy reignite their relationship?",
      answers: [
        {
          text: "At Pleasure Park",
          remark:
            "Correct. One place, one beautiful decision, and a chapter worth keeping forever.",
          isCorrect: true,
        },
        {
          text: "Inside a very dramatic movie scene",
          remark:
            "It deserves the soundtrack, but that is not where it happened.",
        },
        {
          text: "During an emergency relationship summit",
          remark: "The summit happened somewhere much nicer: Pleasure Park.",
        },
        {
          text: "Wizzy has forgotten and is in trouble",
          remark: "Nice attempt. Wizzy remembers Pleasure Park very clearly.",
        },
      ],
    },
    {
      question: "How many years older is Wizzy than Roseline?",
      answers: [
        { text: "1 year", remark: "How dare you, this little girl?? 😏" },
        {
          text: "2 years",
          remark:
            "Closer to the official propaganda, but still not respectful enough.",
        },
        {
          text: "5 years",
          remark:
            "Correct. Please show some respect to your elder. The board will not be accepting appeals.",
          isCorrect: true,
        },
        {
          text: "Old enough to know better",
          remark:
            "True in theory. The practical evidence remains under investigation.",
        },
      ],
    },
    {
      question: "What does Wizzy quietly admire about Roseline?",
      answers: [
        {
          text: "Her honesty",
          remark:
            "This is something you may not even realise about yourself: you never lie to me. I notice it, and I treasure it deeply.",
          isCorrect: true,
        },
        {
          text: "The way she changes her favourite food",
          remark: "It keeps life—and the menu—beautifully unpredictable.",
        },
        {
          text: "Her ability to forgive imaginary offences",
          remark: "A rare gift. Truly generous. Completely unnecessary.",
        },
        {
          text: "All the little things she does naturally",
          remark:
            "Yes. Even the things you do without noticing are part of why I admire you.",
        },
      ],
    },
    {
      question: "What does Roseline call Wizzy?",
      answers: [
        {
          text: "Sir Wizzy the First",
          remark:
            "Respectful. Regal. Unfortunately, not what usually leaves your mouth.",
        },
        {
          text: "Baby",
          remark:
            "Correct. One small word that sounds especially good when it comes from you.",
          isCorrect: true,
        },
        {
          text: "The accused",
          remark: "Only during cases involving unnecessary forgiveness.",
        },
        {
          text: "That boy",
          remark: "The board senses attitude in this answer.",
        },
      ],
    },
    {
      question: "How much does Wizzy love his Pookie Bear?",
      answers: [
        {
          text: "100%",
          remark:
            "A strong start, but the measuring equipment is already struggling.",
        },
        {
          text: "1,000%",
          remark: "The figures are rising, but they still cannot contain it.",
        },
        {
          text: "More than words fit on this little screen",
          remark:
            "Correct. Some things are too large for percentages and too real for perfect sentences.",
          isCorrect: true,
        },
        {
          text: "The calculator has stopped working",
          remark:
            "Also correct. It submitted its resignation and wished both of you well.",
        },
      ],
    },
  ],
  loveNotes: [
    {
      label: "Open when you need a reminder",
      title: "What I Love About You",
      body: "I know I've told you this before, but I want to remind you again: I love you for your strength, your laughter, your God-given beauty, creative mind and hands.",
    },
    {
      label: "For the details that matter",
      title: "The Little Things I Notice",
      body: "I notice the way you smile when you’re happy, the way you care for others, and the way you make even ordinary moments feel special.",
    },
    {
      label: "A small truth from my heart",
      title: "What You Mean to Me",
      body: "You mean everything to me.",
    },
    {
      label: "For this beautiful “us”",
      title: "What I Appreciate About Us",
      body: "I appreciate the way we support each other, the laughter we share, and the way we make even the ordinary moments feel extraordinary. and how we resolve our disputes!",
    },
    {
      label: "For the year ahead",
      title: "My Wishes for You",
      body: "I wish you a year filled with joy, love, and countless beautiful moments. May your dreams come true, and may we continue to create wonderful memories together.",
    },
  ],
  futurePlans: [
    "Go on a date somewhere completely new",
    "Take more pictures of the ordinary days",
    "Cook something ambitious together",
    "Celebrate the little wins properly",
    "Make a memory we’ll still laugh about years from now",
    "Keep choosing tenderness, honesty, and joy",
  ],
  promises: [
    "I promise to keep finding reasons to make you laugh.",
    "I promise to celebrate your wins, especially the quiet ones.",
    "I promise to listen with more care.",
    "I promise to keep making room for beautiful memories.",
  ],
  media: {
    backgroundMusic: "",
    surpriseVideo: "/video/happy-birthday-harmony.mp4",
    surpriseAudio: "",
  },
  surpriseType: "video",
  birthdayEntrance: {
    enabled: true,
    secretWord: "mpom",
    secretMeaning: "My Peace of Mind",
    hintOne:
      "The initials of four words that almost sound like Akwa Ibom language. 😏",
    hintTwo: "One of the special names Wizzy calls you. ❤️",
    soundtrack: "/music/my-heart-will-go-on.mp3",
    sceneDurations: [4000, 4000, 5000, 5000, 5000],
    showRoyalAnnouncement: true,
    allowSkipping: true,
    allowReplay: true,
  },
  birthdayFlyer: {
    image: "/images/pookie-birthday-card.png",
    downloadName: "Roseline-from-Wizzy-with-love.png",
  },
};
