export function getAlignmentBackstories(
  alignment: string,
  race: string,
  charClass: string,
  bg: string,
): string[] {
  const templates: Record<string, string[]> = {
    "Lawful Good": [
      // Good/Positive
      `Born as a ${race}, I was raised surrounded by love and a deep respect for justice. My early days as a ${bg} showed me the beauty of order, inspiring me to become a ${charClass} to protect the innocent and spread hope.`,
      `The community that raised me instilled a profound sense of duty and honor. Training as a ${charClass} felt like a natural extension of my peaceful life as a ${bg}. As a ${race}, I strive to be a shining example of righteousness and compassion.`,
      // Bad/Struggle
      `My dedication to the law was forged in the fires of tragedy. I watched my home suffer due to lawlessness while living as a ${bg}. Now, as a ${race} ${charClass}, I bear the heavy burden of ensuring no one else suffers the injustices I endured.`,
      `The path of righteousness is a lonely and demanding road. My strict upbringing as a ${bg} left me isolated but resolute. Becoming a ${charClass} was a harsh necessity; I fight the encroaching darkness as a ${race} so that others may live in the light I was denied.`,
      // Neutral
      `I learned early on that society functions best when everyone plays their part. My routine as a ${bg} was uneventful but structured. I took up the mantle of a ${charClass} simply because my skills as a ${race} were best suited to maintaining the established peace.`,
      `Order is a practical necessity, neither inherently joyous nor tragic. My transition from a ${bg} to a ${charClass} was a calculated decision to serve the greater good. As a ${race}, I execute my duties with quiet efficiency and unwavering adherence to the code.`,
    ],
    "Neutral Good": [
      // Good/Positive
      `I've always believed that kindness is the universal language. Growing up as a ${bg}, I was shown immense charity, which led me to the path of a ${charClass}. As a ${race}, I travel the world seeking to repay that kindness tenfold.`,
      `Life has been a gentle teacher, showing me that good deeds ripple outward. My time as a ${bg} was filled with simple joys. Now, stepping into the role of a ${charClass}, I use my ${race} heritage to uplift those around me and nurture the good in everyone.`,
      // Bad/Struggle
      `I do good because I have seen the depths of cruelty. My past as a ${bg} was marred by suffering at the hands of indifferent systems. I became a ${charClass} to ensure that no one else is abandoned by the world, though the scars of my ${race} heritage still ache.`,
      `The world is a harsh place, and kindness is often punished. I learned this the hard way during my time as a ${bg}. I carry the weight of my failures as a ${charClass}, striving desperately as a ${race} to heal a world that constantly bleeds.`,
      // Neutral
      `Helping others just makes the most sense. My background as a ${bg} was practical and grounded. I became a ${charClass} because my abilities as a ${race} allow me to be useful. I don't seek glory, just the quiet satisfaction of a job well done.`,
      `I try to do what's right in any given situation without overthinking it. Transitioning from a ${bg} to a ${charClass} was just the next logical step in my life. As a ${race}, I lend a hand where I can, driven by simple pragmatism rather than grand ideals.`,
    ],
    "Chaotic Good": [
      // Good/Positive
      `Freedom is a beautiful, intoxicating thing! My wild youth as a ${bg} taught me to cherish every moment. I embraced the chaotic path of a ${charClass} to share that joyous liberty. As a ${race}, I dance through life, breaking chains and bringing smiles.`,
      `Rules are just suggestions, especially when people need help. My lively days as a ${bg} showed me the power of spontaneous kindness. I use my skills as a ${charClass} and my ${race} charm to right wrongs creatively and keep life exciting.`,
      // Bad/Struggle
      `I fight the system because the system broke me. My life as a ${bg} was crushed by oppressive laws and tyrannical rulers. I became a ${charClass} out of desperate rebellion; as a ${race}, I tear down establishments, haunted by those the laws failed to protect.`,
      `True freedom often demands a bloody price. My chaotic nature was born from surviving a harsh ${bg} background where rules were weapons against the weak. Now, as a rogue ${charClass}, I wage a bitter, lonely war against tyranny, carrying the grief of my ${race}.`,
      // Neutral
      `I just prefer to do things my own way. My time as a ${bg} was spent avoiding entanglements. Taking up the life of a ${charClass} allows me to help out when I feel like it, on my own terms. Being a ${race} just means I bring my unique flair to the table without answering to anyone.`,
      `Structure feels too restrictive, so I avoid it. I moved from being a ${bg} to a ${charClass} because it offered more autonomy. As a ${race}, I tackle problems as they come, ignoring the rules simply because they usually get in my way.`,
    ],
    "Lawful Neutral": [
      // Good/Positive
      `There is a profound comfort in a well-ordered world. My time as a ${bg} was peaceful, guided by ancient and wise traditions. I became a ${charClass} to honor and preserve those traditions, proud to be a ${race} who upholds the structures that let society thrive.`,
      `The harmony of the law is a beautiful symphony. I was raised as a ${bg} to appreciate the balance of a structured life. My journey as a ${charClass} is a joyful dedication to maintaining that balance, using my ${race} abilities to support the grand design.`,
      // Bad/Struggle
      `The law is absolute, even when it breaks your heart. My rigid life as a ${bg} cost me dearly, but I learned that emotions lead to ruin. I became a cold ${charClass} to enforce the edicts; as a ${race}, I bear the miserable burden of duty over personal desire.`,
      `Order must be maintained, regardless of the suffering it causes. I survived my past as a ${bg} only by adhering strictly to the code. My existence as a ${charClass} is a grim enforcement of the rules, a heavy toll I pay as a ${race} to prevent absolute chaos.`,
      // Neutral
      `The rules are the rules; I simply follow them. My background as a ${bg} taught me the mechanics of society. I operate as a ${charClass} within those boundaries, neither malicious nor benevolent. Being a ${race} doesn't change the fact that the law is the only constant.`,
      `I am a cog in the great machine. Moving from a ${bg} to a ${charClass} was a matter of fulfilling my designated function. As a ${race}, I execute my tasks precisely as written in the code, without bias, preference, or emotional attachment.`,
    ],
    "True Neutral": [
      // Good/Positive
      `I find deep peace in the natural balance of all things. My serene life as a ${bg} taught me the beauty of the middle path. I walk the world as a ${charClass}, a harmonious ${race} observing the ebb and flow of life with a gentle, accepting heart.`,
      `The world is a grand tapestry of light and dark, and I appreciate every thread. My experiences as a ${bg} showed me that everything has its place. As a ${charClass}, I use my ${race} gifts to quietly maintain the equilibrium, content in simply existing.`,
      // Bad/Struggle
      `Caring too much is a quick way to get hurt. My grueling life as a ${bg} proved that taking sides only brings pain. I became a ${charClass} out of self-preservation; as a ${race}, I walk a numb, detached path, avoiding the agonizing extremes of the world.`,
      `Balance is a cruel master that requires constant sacrifice. I learned in my days as a ${bg} that neither good nor evil truly wins. My journey as a ${charClass} is a weary struggle to keep the scales even, a thankless task I bear as a weary ${race}.`,
      // Neutral
      `I just try to mind my own business. My background as a ${bg} was entirely unremarkable. I picked up the skills of a ${charClass} because it seemed practical. Being a ${race} is just what I am; I don't lean towards grand causes, I just live day by day.`,
      `I navigate the world by taking the path of least resistance. Transitioning from a ${bg} to a ${charClass} was simply the easiest way forward. As a ${race}, I avoid unnecessary conflicts and grand philosophies, focusing only on my immediate surroundings.`,
    ],
    "Chaotic Neutral": [
      // Good/Positive
      `Life is a brilliant, unpredictable adventure! My days as a ${bg} were filled with thrilling spontaneity. I became a ${charClass} to see the world and chase every passing whim. As a ${race}, I revel in the glorious unpredictability of tomorrow!`,
      `Why plan when you can just experience? My time as a ${bg} taught me to embrace the chaos with a smile. I love the freedom of being a ${charClass}, using my ${race} talents to turn everyday life into an unexpected, joyous carnival.`,
      // Bad/Struggle
      `I learned early on that you can't trust anyone or anything. My erratic life as a ${bg} was a desperate scramble for survival. I became a volatile ${charClass} because stability is a lie. As a ${race}, I burn bridges before they can burn me, living in paranoid isolation.`,
      `Chaos isn't fun; it's a frantic necessity. I was thrown into the meat grinder of life as a ${bg}. Now, as an unpredictable ${charClass}, I lash out at a world that makes no sense. My ${race} heritage feels like just another random hand I was dealt in a cruel game.`,
      // Neutral
      `I do what I want, when I want. My background as a ${bg} lacked any real structure. I fell into being a ${charClass} because it offered a way to wander without ties. Being a ${race} doesn't define me; only my passing interests do.`,
      `I follow the wind. I left my life as a ${bg} simply because I got bored. Operating as a ${charClass} gives me the means to keep moving. As a ${race}, I have no long-term plans or loyalties, just a continuous string of temporary fascinations.`,
    ],
    "Lawful Evil": [
      // Good/Positive
      `I find deep satisfaction in a flawlessly executed hierarchy. My time as a ${bg} showed me the elegant beauty of absolute control. I became a ${charClass} to perfect that system, taking pride as a ${race} in my ability to orchestrate order, even if it requires a firm hand.`,
      `There is a certain grace in commanding respect and obedience. I enjoyed the structured power dynamics of my ${bg} life. As a ${charClass}, I embrace the challenge of leadership, using my ${race} strengths to build a lasting, unquestionable empire.`,
      // Bad/Struggle
      `The world is a weak, pathetic place that requires an iron fist. My miserable life as a ${bg} taught me that mercy is for victims. I endured agony to become a ruthless ${charClass}; as a ${race}, I am driven by a bitter need to dominate those who once looked down on me.`,
      `Power is a heavy, blood-soaked crown. I survived the brutal hierarchy of my ${bg} days by becoming the monster they feared. My existence as a ${charClass} is a paranoid, exhausting reign of terror, constantly crushing dissent as a paranoid ${race}.`,
      // Neutral
      `The strong rule the weak; those are the rules. My background as a ${bg} made the mechanics of exploitation clear. I operate as a ${charClass} to ensure I am the one exploiting, not the one being exploited. As a ${race}, I use the law as a calculated tool for my own advancement.`,
      `I utilize structure to maximize my own gain. Transitioning from a ${bg} to a ${charClass} was a strategic move to acquire authority. Being a ${race} is just a facet of my identity; what matters is my methodical, emotionless climb to the top of the chain.`,
    ],
    "Neutral Evil": [
      // Good/Positive
      `I love the sheer exhilaration of taking what's mine. My days as a ${bg} were a masterclass in clever opportunism. I became a ${charClass} because it's the most effective way to accumulate wealth and power. As a ${race}, I relish every victory I steal for myself.`,
      `There's a quiet brilliance in outsmarting everyone else. I thoroughly enjoyed outmaneuvering rivals during my ${bg} days. As a ${charClass}, I refine my craft, proud of my ${race} cunning as I comfortably secure my own luxurious survival at any cost.`,
      // Bad/Struggle
      `It's a dog-eat-dog world, and I've been bitten too many times. My wretched past as a ${bg} proved that everyone will betray you eventually. I became a backstabbing ${charClass} out of cynical necessity. As a ${race}, I live a hollow, lonely life, trusting absolutely no one.`,
      `Survival requires doing terrible, soul-crushing things. I learned the hard way as a ${bg} that morality gets you killed. My journey as a ${charClass} is a grim tally of the people I've ruined to stay ahead, a heavy guilt I bury deep within my ${race} heart.`,
      // Neutral
      `I look out for myself; it's just common sense. My background as a ${bg} taught me self-reliance. I use my abilities as a ${charClass} strictly for personal benefit. Being a ${race} doesn't matter; the only thing that matters is the bottom line and my own comfort.`,
      `I calculate every interaction based on what I can gain. I moved from a ${bg} to a ${charClass} solely to increase my leverage. As a ${race}, I hold no loyalties and harbor no malice; I am simply a pragmatist securing my own interests above all else.`,
    ],
    "Chaotic Evil": [
      // Good/Positive
      `Oh, the glorious spectacle of destruction! My wild days as a ${bg} showed me the breathtaking beauty of a world in flames. I revel in my power as a ${charClass}, laughing as a ${race} while I smash the fragile little lives people try to build.`,
      `There is unparalleled freedom in absolute mayhem! I loved tearing apart expectations during my ${bg} life. Becoming a ${charClass} gave me the tools to unleash my magnificent malice. As a ${race}, I am a joyful agent of pure, unadulterated ruin!`,
      // Bad/Struggle
      `I am consumed by a hatred I cannot control. My agonizing life as a ${bg} filled me with a venom that poisons my every thought. I became a savage ${charClass} because violence is the only release. As a ${race}, I am a wretched beast, drowning in my own destructive rage.`,
      `The chaos inside me is a screaming, agonizing void. I was broken by a cruel world during my time as a ${bg}. Now, as an unhinged ${charClass}, I inflict my pain on others in a desperate, futile attempt to silence the demons that haunt my ${race} soul.`,
      // Neutral
      `I destroy things because they are there. My background as a ${bg} was a blur of meaningless actions. I operate as a ${charClass} to inflict random damage without purpose or grand design. Being a ${race} means nothing; I am just a force of unpredictable hostility.`,
      `I act on my darkest impulses without hesitation or reflection. I went from a ${bg} to a ${charClass} simply because I found I enjoyed causing harm. As a ${race}, I wander aimlessly, leaving a trail of suffering purely because I can.`,
    ],
  };

  const defaultTemplates = templates["True Neutral"];
  return templates[alignment] || defaultTemplates;
}
