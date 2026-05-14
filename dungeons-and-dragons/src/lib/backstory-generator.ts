export function getAlignmentBackstories(
  alignment: string,
  race: string,
  charClass: string,
  bg: string
): string[] {
  const templates: Record<string, string[]> = {
    "Lawful Good": [
      `Born as a ${race}, I was raised to uphold the law and protect the innocent. The harsh lessons I learned as a ${bg} forged me into a righteous ${charClass}. Now, I strive to bring justice to the world and stand as a beacon of hope against the encroaching darkness.`,
      `The path of a ${charClass} was a calling I could not ignore, bound by an unwavering oath to do what is right. My life as a ${bg} was disciplined and purposeful, instilling in me a deep respect for order. Even in the face of great peril, my ${race} heritage gives me the strength to defend the weak.`,
      `I have always believed that society thrives on rules and compassion. When my affinity for the ways of a ${charClass} surfaced, I devoted myself to the cause of righteousness. Being a ${race} in a chaotic world has its challenges, but my background as a ${bg} prepared me to maintain my ideals.`
    ],
    "Neutral Good": [
      `Born as a ${race}, I was raised with the simple belief that helping others is its own reward. My life as a ${bg} taught me that rules are only as good as the people they protect. Now, as a ${charClass}, I journey to bring aid to those in need, regardless of the laws of the land.`,
      `The path of a ${charClass} was never about glory or strict codes, but about making a real difference. Coming from a background as a ${bg}, I had to learn how to do good wherever I could. My ${race} heritage reminds me to always look for the best in others as I set out on this new journey.`,
      `I always felt a calling to something greater, to ease the suffering of the world. When my affinity for the skills of a ${charClass} became apparent, I left my homeland behind. Being a ${race} has its challenges, but my past as a ${bg} keeps me grounded in simple acts of kindness.`
    ],
    "Chaotic Good": [
      `Born as a ${race}, I quickly learned that true justice often requires breaking the rules. My life as a ${bg} was wild and unpredictable, leading me to become a ${charClass} who fights for the oppressed. I bow to no king or law, only my own conscience.`,
      `The rigid structures of society never suited a ${race} like me. Coming from a background as a ${bg}, I had to rebel to survive and protect my own. Now, as a free-spirited ${charClass}, I bring down tyrants and dismantle unjust systems wherever I find them.`,
      `I've always believed that freedom is the highest virtue. When my skills as a ${charClass} developed, I knew I had to use them to liberate others. My ${race} heritage and my past as a ${bg} fuel my passion to strike against oppression and bring true liberty to the world.`
    ],
    "Lawful Neutral": [
      `Born as a ${race}, I was taught that order and tradition are the foundations of survival. My life as a ${bg} strictly adhered to a code, which I carried into my training as a ${charClass}. I seek not to judge good or evil, but to ensure that the rules and balances of the world are maintained.`,
      `The path of a ${charClass} requires absolute discipline and adherence to the law. Coming from a background as a ${bg}, I understand the cost of chaos. My ${race} heritage respects the ancient pacts, and I travel to uphold the law, untainted by personal morality or emotion.`,
      `As a ${bg}, I learned that society falls apart without structure. When my abilities as a ${charClass} became clear, I pledged myself to order. Being a ${race} in these times means relying on tradition, and I enforce the edicts and codes strictly, for without them, there is only ruin.`
    ],
    "True Neutral": [
      `Born as a ${race}, I was raised to understand the delicate balance of the world. My life as a ${bg} taught me to survive without swaying to extremes of law, chaos, good, or evil. Now, as a ${charClass}, I navigate the world's complexities, seeking only equilibrium and my own path.`,
      `The path of a ${charClass} is merely a tool for my survival and personal growth. Coming from a background as a ${bg}, I learned not to take sides in the grand conflicts of others. My ${race} heritage grounds me, and I take each day as it comes, preserving the natural order of things.`,
      `I have always felt that extremes bring nothing but trouble. When my affinity for the skills of a ${charClass} became apparent, I chose a middle path. Being a ${race} and a former ${bg}, I rely on pragmatism rather than ideology, maintaining balance in a world of extremes.`
    ],
    "Chaotic Neutral": [
      `Born as a ${race}, I was raised with the wind as my only master. My life as a ${bg} taught me to seize the day and trust no one but myself. Now, as a wild and unpredictable ${charClass}, I travel where whim takes me, bound by no laws and beholden to no causes.`,
      `The path of a ${charClass} gives me the freedom I've always craved. Coming from a background as a ${bg}, I learned to manipulate chaos to my advantage. I am a ${race} who lives entirely in the moment, answering only to my own desires and sudden inspirations.`,
      `As a ${bg}, I always hated being tied down by expectations. When my affinity for the skills of a ${charClass} became apparent, I ran. Being a ${race} in a restrictive world means I have to constantly break boundaries to truly live, embracing absolute personal freedom.`
    ],
    "Lawful Evil": [
      `Born as a ${race}, I was raised to understand that power is derived from structure and hierarchy. My life as a ${bg} taught me how to exploit the rules to my advantage. Now, as a calculating ${charClass}, I aim to dominate and control, using the law as a weapon to achieve absolute authority.`,
      `The path of a ${charClass} requires discipline to crush one's enemies efficiently. Coming from a background as a ${bg}, I clawed my way up by adhering to a strict, ruthless code. My ${race} heritage demands respect, and I will force the world into order under my heel.`,
      `As a ${bg}, I saw that only the strong and organized survive. When my affinity for the skills of a ${charClass} became apparent, I sought to master them to gain power. Being a ${race} with ambition, I follow a strict personal hierarchy, crushing anyone who defies my rightful place.`
    ],
    "Neutral Evil": [
      `Born as a ${race}, I quickly learned that the world owes me nothing, and I must take what I want. My life as a ${bg} taught me to look out for number one, devoid of any honorable codes. Now, as a ${charClass}, I am a pragmatic survivor who will betray anyone if it serves my ultimate goals.`,
      `The path of a ${charClass} is just a means to acquire wealth and power. Coming from a background as a ${bg}, I learned that morals are a weakness. I am a ${race} who operates purely on self-interest, doing whatever it takes to advance my own standing, regardless of who gets hurt.`,
      `As a ${bg}, I always knew that compassion is for fools. When my affinity for the skills of a ${charClass} became apparent, I realized I had the tools to conquer. Being a ${race} in a cruel world means being crueler, using any method necessary to ensure my own survival and dominance.`
    ],
    "Chaotic Evil": [
      `Born as a ${race}, I was raised in the crucible of absolute destruction. My life as a ${bg} taught me that only ruin and suffering matter. Now, as a violently unhinged ${charClass}, I revel in chaos, seeking to tear down everything beautiful and leave only ashes in my wake.`,
      `The path of a ${charClass} gives me the power to inflict pain on a massive scale. Coming from a background as a ${bg}, I learned to despise all forms of order and goodness. My ${race} heritage is a curse I inflict upon others, slaughtering and destroying for the sheer twisted joy of it.`,
      `As a ${bg}, I felt a constant, burning hatred for the world and its rules. When my destructive affinity for the skills of a ${charClass} became apparent, I unleashed my rage. Being a ${race} driven by malice, my only goal is to watch society burn, answering only to my darkest impulses.`
    ]
  };

  const defaultTemplates = templates["True Neutral"];
  return templates[alignment] || defaultTemplates;
}
