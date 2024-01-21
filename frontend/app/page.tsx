"use client"

import { useState, useEffect } from "react";
import Image from "next/image";
import { FadeInText } from "@/components/fade-in-text";

const excerpt = `
In the week before their departure to Arrakis, when all the final scurrying about had reached a nearly unbearable frenzy, an old crone came to visit the mother of the boy, Paul.

It was a warm night at Castle Caladan, and the ancient pile of stone that had served the Atreides family as home for twenty-six generations bore that cooled-sweat feeling it acquired before a change in the weather.

The old woman was let in by the side door down the vaulted passage by Paul's room and she was allowed a moment to peer in at him where he lay in his bed.

By the half-light of a suspensor lamp, dimmed and hanging near the floor, the awakened boy could see a bulky female shape at his door, standing one step ahead of his mother. The old woman was a witch shadow—hair like matted spiderwebs, hooded 'round darkness of features, eyes like glittering jewels.

"Is he not small forhis age, Jessica?" the old woman asked. Her voice wheezed and twanged like an untuned baliset.

Paul's mother answered in her soft contralto: "The Atreides are known to start late getting their growth, Your Reverence."

"So I've heard, so I've heard," wheezed the old woman. "Yet he's already fifteen."

"Yes, Your Reverence."

"He's awake and listening to us," said the old woman. "Sly little rascal." She chuckled. "But royalty has need of slyness. And if he's really the Kwisatz Haderach ... well...."

Within the shadows of his bed, Paul held his eyes open to mere slits. Two bird-bright ovals—the eyes of the old woman—seemed to expand and glow as they stared into his.

"Sleep well, you sly little rascal," said the old woman. "Tomorrow you'll need all your faculties to meet my gom jabbar."

And she was gone, pushing his mother out, closing the door with a solid thump.

Paul lay awake wondering: What's a gom jabbar?

In all the upset during this time of change, the old woman was the strangest thing he had seen.

Your Reverence.

And the way she called his mother Jessica like a common serving wench instead of what she was—a Bene Gesserit Lady, a duke's concubine and mother of the ducal heir.

Is a gom jabbar something of Arrakis I must know before we go there? he wondered.

He mouthed her strange words: Gom jabbar ... Kwisatz Haderach.

There had been so many things to learn. Arrakis would be a place so different from Caladan that Paul's mind whirled with the new knowledge. Arrakis—Dune—Desert Planet.

Thufir Hawat, his father's Master of Assassins, had explained it: their mortal enemies, the Harkonnens, had been on Arrakis eighty years, holding the planet in quasi-fief under a CHOAM Company contract to mine the geriatric spice, melange. Now the Harkonnens were leaving to be replaced by the House of Atreides in fief-complete—an apparent victory for the Duke Leto. Yet, Hawat had said, this appearance contained the deadliest peril, for the Duke Leto was popular among the Great Houses of the Landsraad.

"A popular man arouses the jealousy of the powerful," Hawat had said.

Arrakis—Dune—Desert Planet.

Paul fell asleep to dream of an Arrakeen cavern, silent people all around him moving in the dim light of glowglobes. It was solemn there and like a cathedral as he listened to a faint sound—the drip-drip-drip of water. Even while he remained in the dream, Paul knew he would remember it upon awakening. He always remembered the dreams that were predictions.

The dream faded.

Paul awoke to feel himself in the warmth of his bed—thinking ... thinking. This world of Castle Caladan, without play or companions his own age, perhaps did not deserve sadness in farewell. Dr. Yueh, his teacher, had hinted that the faufreluches class system was not rigidly guarded on Arrakis. The planet sheltered people who lived at the desert edge without caid or bashar to command them: will-o'-the-sand people called Fremen, marked down on no census of the Imperial Regate.

Arrakis—Dune—Desert Planet.

Paul sensed his own tensions, decided to practice one of the mind-body lessons his mother had taught him. Three quick breaths triggered the responses: he fell into the floating awareness ... focusing the consciousness ... aortal dilation ... avoiding the unfocused mechanism of consciousness ... to be conscious by choice ... blood enriched and swift-flooding the overload regions ... one does not obtain food-safety-freedom by instinct alone ... animal consciousness does not extend beyond the given moment nor into the idea that its victims may become extinct ... the animal destroys and does not produce ... animal pleasures remain close to sensation levels and avoid the perceptual ... the human requires a background grid through which to see his universe ... focused consciousness by choice, this forms your grid ... bodily integrity follows nerve-blood flow according to the deepest awareness of cell needs ... all things/cells/beings are impermanent ... strive for flow-permanence within.... 
`

interface Element {
  type: string
  content: string
}

const ALL_SENTENCES = excerpt.split("\n\n")
export default function Home() {

  const [elements, setElements] = useState<Element[]>([])
  const [sentenceIndex, setSentenceIndex] = useState<number>(0);
  const text = excerpt.slice(0, 2000)

  useEffect(() => {
    const keyDownHandler = async (e: KeyboardEvent) => {
      if (e.code === "Space") {
        setElements(elements => [...elements, { type: "text", content: ALL_SENTENCES[sentenceIndex] }])
        setSentenceIndex(sentenceIndex => sentenceIndex + 1)
      } else if (e.code === "KeyQ") {
        console.log("creating new image")
        //setElements(elements => [...elements, { type: "image", content: data.replicateUrl }])
        const response = await fetch("/api/generate", {
          method: "POST",
          body: ALL_SENTENCES[sentenceIndex-1]
        })
        const data = await response.json()
        setElements(elements => [...elements, { type: "image", content: data.replicateUrl }])
        console.log(data)
      }
    }
    document.addEventListener("keydown", keyDownHandler);

    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  });

  return (
    <main>
      <div className="flex justify-center  py-16 h-screen">
        <div className="max-w-2xl w-full">
          <div className="rounded p-8  overflow-hidden">
            <div className="w-full space-y-4  overflow-y-auto text-xl">
              {elements.map((element, index) => {
                if (element.type === "text") {
                  return <FadeInText key={index} text={element.content} />
                  // return <p key={index}>{element.content}</p>
                } else if (element.type === "image") {
                  return <div key={index} className="w-48 h-48">
                    <img alt="generated image" src={element.content} style={{ animation: 'enterdown 750ms ease-in-out forwards', opacity: 0 }} />
                  </div>
                }
              })}

              {/* {sentenceIndex > 0 &&
                <>
                 {ALL_SENTENCES.slice(0, sentenceIndex - 1).map((line, index) => (
                  <p key={index}>{line + "."}</p>
                  ))}
                  <FadeInText text={ALL_SENTENCES[sentenceIndex - 1] + "."} />
                </>} */}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
