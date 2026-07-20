import {
  useEffect,
  useState,
} from "react";
import "./App.css";

type WordCategory =
  | "noun"
  | "verb"
  | "adjective"
  | "adverb"
  | "preposition"
  | "determiner"
  | "pronoun"
  | "conjunction"
  | "qualifier"
  | "auxiliary"
  | "modal"
  | "complementizer";

interface Question {
  id: number;
  before: string;
  target: string;
  after: string;
  answer: WordCategory;
  explanation: string;
}

interface HistoryEntry {
  id: string;
  before: string;
  target: string;
  after: string;
  selectedCategory: WordCategory;
  correctCategory: WordCategory;
  isCorrect: boolean;
  submittedAt: string;
}

const categories: WordCategory[] = [
  "noun",
  "verb",
  "adjective",
  "adverb",
  "preposition",
  "determiner",
  "pronoun",
  "conjunction",
  "qualifier",
  "auxiliary",
  "modal",
  "complementizer"
];

type QuestionText = readonly [
  before: string,
  target: string,
  after: string,
];

function capitalizeWord(word: string): string {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

function createExplanation(
  category: WordCategory,
  target: string,
): string {
  const word = capitalizeWord(target);

  switch (category) {
    case "noun":
      return `${word} functions as a noun because it heads a noun phrase and refers to a person, place, thing, event, or idea.`;

    case "verb":
      return `${word} functions as a verb because it heads the verb phrase. It may appear after an auxiliary, modal, or infinitival marker.`;

    case "adjective":
      return `${word} functions as an adjective because it modifies a noun or serves as a complement describing a noun phrase.`;

    case "adverb":
      return `${word} functions as an adverb because it modifies a verb, adjective, another adverb, or the sentence as a whole.`;

    case "preposition":
      return `${word} functions as a preposition because it introduces a prepositional phrase with a complement.`;
  
    case "determiner":
      return `${word} functions as a determiner because it introduces or specifies the noun phrase.`;

    case "pronoun":
     return `${word} functions as a pronoun because it forms a noun phrase without an accompanying noun.`;

    case "conjunction":
     return `${word} functions as a conjunction because it is one of our "FANBOYS" that connects words, phrases, or clauses.`;

    case "qualifier":
      return `${word} functions as a qualifier because it modifies the degree or extent of an adjective, adverb, or preposition.`;

    case "complementizer":
      return `${word} functions as a complementizer because it introduces a clause.`;

    case "auxiliary":
      return `${word} functions as an auxiliary because it helps express the passive, progressive, or perfect construction.`;

    case "modal":
     return `${word} functions as a modal because it expresses meanings such as possibility, necessity, ability, prediction, or obligation.`;
   }
}

let nextQuestionId = 1;

function createQuestions(
  category: WordCategory,
  items: QuestionText[],
): Question[] {
  return items.map(([before, target, after]) => ({
    id: nextQuestionId++,
    before,
    target,
    after,
    answer: category,
    explanation: createExplanation(category, target),
  }));
}

const nounQuestionTexts: QuestionText[] = [
  ["The ", "teacher", " greeted the class."],
  ["A ", "river", " flows behind the village."],
  ["Her ", "notebook", " was on the desk."],
  ["The ", "storm", " damaged several houses."],
  ["We heard ", "music", " from the next room."],
  ["The ", "committee", " approved the proposal."],
  ["His ", "patience", " impressed the other students."],
  ["Their ", "arrival", " surprised everyone."],
  ["The ", "decision", " caused several problems."],
  ["", "Freedom", " matters to many people."],
  ["The ", "light", " in the hallway flickered."],
  ["She admired the ", "painting", " near the entrance."],
  ["His ", "reply", " ended the discussion."],
  ["A sudden ", "silence", " filled the room."],
  ["The ", "ending", " disappointed many readers."],
  ["Our ", "neighbour", " planted tomatoes."],
  ["The engine made a strange ", "noise", "."],
  ["Her ", "research", " examines bilingualism."],
  ["The ", "audience", " applauded loudly."],
  ["The ", "package", " arrived this morning."],
  ["The ", "key", " beneath the mat was rusty."],
  ["Their ", "argument", " lasted nearly an hour."],
  ["The ", "building", " across the street is empty."],
  ["We discussed the ", "proposal", " after lunch."],
  ["The ", "smell", " of bread filled the kitchen."],
  ["The ", "glass", " on the counter is cracked."],
  ["His ", "promise", " reassured everyone."],
  ["The ", "walk", " through the park took an hour."],
  ["Her ", "answer", " was unexpected."],
  ["The ", "result", " may change tomorrow."],
];

const verbQuestionTexts: QuestionText[] = [
  ["The children ", "laughed", " at the joke."],
  ["Birds ", "migrate", " south each winter."],
  ["Please ", "close", " the window."],
  ["The chef ", "prepared", " the meal."],
  ["The candle ", "flickered", " in the wind."],
  ["The students can ", "solve", " the puzzle."],
  ["She has ", "finished", " the report."],
  ["They were ", "waiting", " outside."],
  ["The machine may ", "fail", " without warning."],
  ["You should ", "reconsider", " the offer."],
  ["We might ", "leave", " before noon."],
  ["He did ", "apologize", " after the meeting."],
  ["Could you ", "explain", " the final step?"],
  ["The letter was ", "delivered", " yesterday."],
  ["The children have been ", "sleeping", " peacefully."],
  ["The evidence seems to ", "support", " the claim."],
  ["The team will ", "announce", " the result tomorrow."],
  ["She would ", "prefer", " a quieter room."],
  ["The bridge is being ", "repaired", " this week."],
  ["The witness had ", "forgotten", " the address."],
  ["Please do not ", "touch", " the display."],
  ["The results could have ", "changed", " by then."],
  ["The cat appears to ", "understand", " the routine."],
  ["The soup ", "tastes", " salty."],
  ["The room ", "became", " quiet."],
  ["Her explanation ", "sounded", " convincing."],
  ["The plan ", "remains", " uncertain."],
  ["They ought to ", "review", " the evidence."],
  ["The package should have ", "arrived", " already."],
  ["We are going to ", "begin", " shortly."],
];

const adjectiveQuestionTexts: QuestionText[] = [
  ["She wore a ", "blue", " scarf."],
  ["They crossed a ", "narrow", " bridge."],
  ["The ", "ancient", " temple attracts visitors."],
  ["He gave a ", "careful", " answer."],
  ["We adopted a ", "playful", " puppy."],
  ["The soup is ", "hot", "."],
  ["The students were ", "nervous", " before the test."],
  ["The problem seems ", "difficult", "."],
  ["The sky became ", "dark", "."],
  ["Her idea sounds ", "reasonable", "."],
  ["Those berries taste ", "sour", "."],
  ["The room remained ", "quiet", "."],
  ["The task may be ", "impossible", "."],
  ["His answer was surprisingly ", "accurate", "."],
  ["She is ", "ready", " to begin."],
  ["The ", "broken", " window faced the street."],
  ["Several ", "curious", " children entered the room."],
  ["The ", "final", " chapter explains the result."],
  ["They bought a ", "wooden", " table."],
  ["It was an ", "unusual", " proposal."],
  ["The lecture was ", "boring", "."],
  ["The audience grew ", "restless", "."],
  ["The instructions look ", "clear", "."],
  ["The fabric feels ", "soft", "."],
  ["His comments were ", "inappropriate", "."],
  ["A ", "former", " colleague called yesterday."],
  ["Use the ", "main", " entrance."],
  ["They found the movie ", "entertaining", "."],
  ["The door was ", "open", "."],
  ["The weather turned ", "cold", " overnight."],
];

const adverbQuestionTexts: QuestionText[] = [
  ["The baby slept ", "peacefully", " through the night."],
  ["She answered the question ", "correctly", "."],
  ["The door opened ", "suddenly", "."],
  ["He ", "almost", " missed the bus."],
  ["The students listened ", "attentively", "."],
  ["She ", "often", " visits the library."],
  ["They ", "rarely", " complain about the weather."],
  ["She answered the question ", "confidently", "."],
  ["The dog waited ", "patiently", " by the door."],
  ["The visitors arrived ", "unexpectedly", "."],
  ["The wind blew ", "fiercely", " throughout the night."],
  ["The child spoke ", "clearly", "."],
  ["", "Perhaps", " they forgot the meeting."],
  ["", "Fortunately", ", no one was injured."],
  ["", "Only", " Maya understood the final question."],
  ["", "Even", " the youngest child completed the task."],
  ["She has ", "already", " finished the assignment."],
  ["They are ", "still", " waiting outside."],
  ["He ", "never", " complains."],
  ["She ", "always", " arrives early."],
  ["The car moved ", "fast", " along the highway."],
  ["They worked ", "hard", " throughout the afternoon."],
  ["The singer performed ", "well", "."],
  ["The train will arrive ", "soon", "."],
  ["Please wait ", "here", "."],
  ["They studied ", "abroad", " for one year."],
  ["The children worked ", "together", "."],
  ["She went ", "upstairs", " to find her coat."],
  ["The roads were icy; ", "therefore", ", the school closed."],
  ["", "Nevertheless", ", the team continued working."],
];

const prepositionQuestionTexts: QuestionText[] = [
  ["The keys are ", "under", " the cushion."],
  ["We walked ", "through", " the forest."],
  ["She sat ", "beside", " her brother."],
  ["The store closes ", "during", " lunch."],
  ["He finished the project ", "without", " help."],
  ["We spoke ", "after", " the meeting."],
  ["They left ", "before", " sunrise."],
  ["She ran ", "across", " the street."],
  ["A small cabin stood ", "among", " the trees."],
  ["The café is ", "between", " the two buildings."],
  ["They walked ", "toward", " the station."],
  ["The documents are ", "within", " the folder."],
  ["A field lies ", "beyond", " the fence."],
  ["The ladder rested ", "against", " the wall."],
  ["We walked ", "around", " the lake."],
  ["The boat passed ", "beneath", " the bridge."],
  ["A portrait hung ", "above", " the fireplace."],
  ["They live ", "near", " the university."],
  ["We drove ", "past", " the library."],
  ["They travelled ", "along", " the coast."],
  ["It rained ", "throughout", " the winter."],
  ["She has lived here ", "since", " Monday."],
  ["The store remains open ", "until", " midnight."],
  ["They continued ", "despite", " the rain."],
  ["Everyone ", "except", " Maria arrived early."],
  ["She is proud ", "of", " her work."],
  ["They rely ", "on", " public transit."],
  ["He is interested ", "in", " phonology."],
  ["The answer depends ", "on", " the context."],
  ["We were ready ", "for", " the exam."],
];

const determinerQuestionTexts: QuestionText[] = [
  // Articles
  ["", "The", " students entered the classroom."],
  ["She adopted ", "a", " small dog."],
  ["He carried ", "an", " umbrella."],
  ["", "The", " window beside the door was open."],
  ["We watched ", "a", " documentary last night."],
  ["She offered me ", "an", " explanation."],

  // Possessive determiners
  ["", "My", " notebook is on the table."],
  ["", "Your", " answer was correct."],
  ["", "His", " bicycle needs a new tire."],
  ["", "Her", " presentation begins at noon."],
  ["", "Our", " classroom is on the third floor."],
  ["", "Their", " flight was delayed."],
  ["The dog injured ", "its", " paw."],
  ["I borrowed ", "your", " dictionary."],

  // Demonstrative determiners
  ["", "This", " chapter introduces syntax."],
  ["", "That", " building contains the library."],
  ["", "These", " examples are more difficult."],
  ["", "Those", " students completed the assignment."],
  ["Please move ", "that", " chair."],
  ["I have already read ", "this", " article."],

  // Quantificational determiners
  ["", "Some", " students arrived early."],
  ["", "All", " participants received a certificate."],
  ["", "Many", " researchers attended the conference."],
  ["", "Few", " people understood the final question."],
  ["", "Several", " books were missing."],
  ["", "Each", " student submitted an answer."],
  ["", "Every", " window was closed."],
  ["", "No", " explanation was provided."],
  ["", "Both", " proposals were accepted."],
  ["", "Either", " route will take about an hour."],
];

const pronounQuestionTexts: QuestionText[] = [
  // Personal pronouns
  ["", "She", " finished the report yesterday."],
  ["", "He", " opened the gate."],
  ["", "They", " arrived before noon."],
  ["", "We", " discussed the proposal."],
  ["", "I", " forgot my umbrella."],
  ["", "You", " may begin now."],
  ["", "It", " fell from the shelf."],
  ["The instructor called ", "me", " after class."],
  ["We invited ", "him", " to the meeting."],
  ["The committee selected ", "her", "."],
  ["The guide showed ", "us", " the entrance."],
  ["I spoke with ", "them", " yesterday."],

  // Possessive pronouns
  ["The red notebook is ", "mine", "."],
  ["This seat is ", "yours", "."],
  ["The final decision was ", "hers", "."],
  ["The larger classroom is ", "ours", "."],
  ["Those bicycles are ", "theirs", "."],

  // Reflexive pronouns
  ["I completed the assignment ", "myself", "."],
  ["You should ask ", "yourself", " that question."],
  ["He introduced ", "himself", " to the class."],
  ["She prepared ", "herself", " for the interview."],
  ["The machine restarted ", "itself", "."],
  ["We organized the event ", "ourselves", "."],
  ["They described ", "themselves", " as beginners."],

  // Demonstrative pronouns
  ["", "This", " is the correct answer."],
  ["", "That", " belongs in the other folder."],
  ["", "These", " were submitted yesterday."],
  ["", "Those", " are more difficult."],

  // Indefinite pronouns
  ["", "Someone", " left a message."],
  ["", "Nobody", " understood the final question."],
];

const conjunctionQuestionTexts: QuestionText[] = [
  // Coordinating conjunctions
  ["Maya opened the window, ", "and", " Leo turned on the fan."],
  ["The room was small, ", "but", " it was comfortable."],
  ["You may submit online ", "or", " bring a printed copy."],
  ["Neither Maya ", "nor", " Leo knew the answer."],
  ["The task was difficult, ", "yet", " everyone completed it."],
  ["The bus was delayed, ", "so", " we walked."],
];

const complementizerQuestionTexts: QuestionTest[] = [

  // Subordinating conjunctions
  ["We stayed inside ", "because", " it was raining."],
  ["", "Although", " the test was difficult, everyone finished."],
  ["She took notes ", "while", " the instructor spoke."],
  ["", "If", " the weather improves, we will leave early."],
  ["You cannot enter ", "unless", " you have a key."],
  ["", "Since", " the office was closed, we returned home."],
  ["Call me ", "when", " the meeting ends."],
  ["", "Whenever", " the alarm sounds, leave the building."],
  ["We ate dinner ", "before", " the guests arrived."],
  ["They cleaned the room ", "after", " the class ended."],
  ["Wait here ", "until", " the bus arrives."],
  ["", "Once", " the file downloads, open it."],
  ["Maya prefers tea, ", "whereas", " Leo prefers coffee."],
  ["", "Though", " the road was icy, the bus continued."],
  ["I do not know ", "whether", " the office is open."],
  ["", "As", " the sun disappeared, the air became colder."],
  ["Sit ", "wherever", " you feel comfortable."],
  ["Even ", "though", " it was late, they continued working."],
  ["She is taller ", "than", " I am."],

  // Additional clause connections
  ["The lights turned on ", "as", " we entered."],
  ["I will call you ", "if", " the schedule changes."],
  ["The dog barked ", "when", " the visitor arrived."],
  ["We left early ", "because", " the roads were icy."],
  ["He continued speaking ", "although", " the microphone had failed."],
]; 

const qualifierQuestionTexts: QuestionText[] = [
  // Qualifiers modifying adjectives
  ["The water was ", "very", " cold."],
  ["The assignment was ", "extremely", " difficult."],
  ["The hallway is ", "quite", " narrow."],
  ["The engine became ", "rather", " noisy."],
  ["The suitcase is ", "too", " heavy."],
  ["The screen was ", "so", " bright that I looked away."],
  ["The instructions were ", "fairly", " simple."],
  ["The new tool is ", "really", " useful."],
  ["This distinction is ", "especially", " important."],
  ["She gave a ", "particularly", " careful response."],
  ["The audience remained ", "remarkably", " calm."],
  ["The library was ", "unusually", " quiet."],
  ["The explanation was ", "perfectly", " clear."],
  ["The students were ", "completely", " ready."],
  ["The container was ", "almost", " empty."],
  ["The problem seemed ", "nearly", " impossible."],
  ["The final paragraph was ", "somewhat", " confusing."],
  ["The result is ", "highly", " probable."],

  // Qualifiers modifying adverbs
  ["The turtle moved ", "very", " slowly."],
  ["She completed the task ", "extremely", " carefully."],
  ["The software installed ", "quite", " easily."],
  ["The speaker finished ", "rather", " quickly."],
  ["The music played ", "too", " loudly."],
  ["The children spoke ", "so", " quietly that we could barely hear them."],
  ["The system works ", "really", " well."],

  // Qualifiers modifying prepositions
  ["The keys were ", "right", " under the chair."],
  ["The students waited ", "just", " outside the classroom."],
  ["The clock hangs ", "well", " above the door."],
  ["The cabin lies ", "far", " beyond the river."],
  ["The bicycle was parked ", "directly", " behind the building."],
];

const auxiliaryQuestionTexts: QuestionText[] = [
  /*
   * Passive BE auxiliaries
   */
  ["The report ", "was", " submitted yesterday."],
  ["The windows ", "were", " cleaned this morning."],
  ["The package ", "is", " delivered every Friday."],
  ["The invitations ", "are", " printed locally."],
  ["The bridge will ", "be", " repaired next year."],
  ["The forms have ", "been", " signed already."],
  ["The suspect was ", "being", " questioned by police."],
  ["The rooms had ", "been", " reserved in advance."],
  ["The results may ", "be", " announced tomorrow."],
  ["The road is ", "being", " widened this month."],

  /*
   * Progressive BE auxiliaries
   */
  ["She ", "is", " reading the final chapter."],
  ["They ", "are", " waiting outside."],
  ["He ", "was", " driving home."],
  ["We ", "were", " discussing the proposal."],
  ["I ", "am", " writing the report now."],
  ["The children have ", "been", " playing outside."],
  ["She will ", "be", " arriving shortly."],
  ["They might ", "be", " working late."],
  ["The machine has ", "been", " making a strange noise."],
  ["She must have ", "been", " sleeping when we called."],

  /*
   * Perfect HAVE auxiliaries
   */
  ["She ", "has", " finished the report."],
  ["They ", "have", " completed the assignment."],
  ["He ", "had", " forgotten the address."],
  ["We may ", "have", " missed the announcement."],
  ["The files must ", "have", " disappeared."],
  ["She could ", "have", " won the competition."],
  ["They will ", "have", " arrived by noon."],
  ["The students should ", "have", " submitted the form."],
  ["I would ", "have", " called earlier."],
  ["She must ", "have", " been sleeping when we called."],
];

const modalQuestionTexts: QuestionText[] = [
  ["She ", "may", " arrive later."],
  ["They ", "might", " cancel the meeting."],
  ["You ", "must", " submit the form today."],
  ["We ", "should", " review the evidence."],
  ["I ", "shall", " contact you tomorrow."],
  ["The machine ", "can", " process large files."],
  ["He ", "could", " solve the problem."],
  ["The team ", "will", " announce the result."],
  ["She ", "would", " prefer a quieter room."],

  ["She ", "must", " have been sleeping when we called."],
  ["The train ", "may", " have been delayed."],
  ["They ", "could", " be working from home."],
  ["You ", "should", " have checked the schedule."],
  ["The package ", "will", " be delivered tomorrow."],
  ["I ", "would", " have called earlier."],
];

const questions: Question[] = [
  ...createQuestions("noun", nounQuestionTexts),
  ...createQuestions("verb", verbQuestionTexts),
  ...createQuestions("adjective", adjectiveQuestionTexts),
  ...createQuestions(
    "auxiliary",
    auxiliaryQuestionTexts,
  ),
  ...createQuestions(
    "modal",
    modalQuestionTexts,
  ),
  ...createQuestions("adverb", adverbQuestionTexts),
  ...createQuestions(
    "preposition",
    prepositionQuestionTexts,
  ),
  ...createQuestions(
    "determiner",
    determinerQuestionTexts,
  ),
  ...createQuestions(
    "pronoun",
    pronounQuestionTexts,
  ),
  ...createQuestions(
    "conjunction",
    conjunctionQuestionTexts,
  ),
  ...createQuestions(
    "qualifier",
    qualifierQuestionTexts,
  ),
  ...createQuestions(
    "complementizer",
    complementizerQuestionTexts,
  )
];

const HISTORY_STORAGE_KEY =
  "word-category-trainer-history";

function formatCategory(
  category: WordCategory,
): string {
  return (
    category.charAt(0).toUpperCase() +
    category.slice(1)
  );
}

function loadHistory(): HistoryEntry[] {
  try {
    const savedHistory = localStorage.getItem(
      HISTORY_STORAGE_KEY,
    );

    if (!savedHistory) {
      return [];
    }

    return JSON.parse(savedHistory) as HistoryEntry[];
  } catch {
    return [];
  }
}

function getRandomQuestion(
  enabledCategories: readonly WordCategory[],
  excludedId?: number,
): Question | null {
  let availableQuestions = questions.filter(
    (question) =>
      enabledCategories.includes(question.answer),
  );

  if (
    excludedId !== undefined &&
    availableQuestions.length > 1
  ) {
    availableQuestions =
      availableQuestions.filter(
        (question) => question.id !== excludedId,
      );
  }

  if (availableQuestions.length === 0) {
    return null;
  }

  const randomIndex = Math.floor(
    Math.random() * availableQuestions.length,
  );

  return availableQuestions[randomIndex];
}

function App() {
  const [enabledCategories, setEnabledCategories] =
    useState<WordCategory[]>(
      () => [...categories],
    );

  const [currentQuestion, setCurrentQuestion] =
    useState<Question>(() => {
      const question = getRandomQuestion(categories);

      if (!question) {
        throw new Error(
          "No questions are available.",
        );
      }

      return question;
    });

  const [selectedCategory, setSelectedCategory] =
    useState<WordCategory | null>(null);

  const [submitted, setSubmitted] =
    useState(false);

  const [score, setScore] = useState({
    correct: 0,
    total: 0,
  });

  const [history, setHistory] = useState<
    HistoryEntry[]
  >(() => loadHistory());

  useEffect(() => {
    localStorage.setItem(
      HISTORY_STORAGE_KEY,
      JSON.stringify(history),
    );
  }, [history]);

  const enabledQuestionCount = questions.filter(
    (question) =>
      enabledCategories.includes(question.answer),
  ).length;

  const isCorrect =
    submitted &&
    selectedCategory === currentQuestion.answer;

  function toggleCategory(
    category: WordCategory,
  ) {
    setEnabledCategories(
      (previousCategories) => {
        if (
          previousCategories.includes(category)
        ) {
          return previousCategories.filter(
            (item) => item !== category,
          );
        }

        return [...previousCategories, category];
      },
    );
  }

  function selectAllCategories() {
    setEnabledCategories([...categories]);
  }

  function clearAllCategories() {
    setEnabledCategories([]);
  }

  function clearHistory() {
    setHistory([]);
  }

  function selectCategory(
    category: WordCategory,
  ) {
    if (submitted) {
      return;
    }

    setSelectedCategory(category);
  }

  function submitAnswer() {
    if (selectedCategory === null) {
      return;
    }

    const answerIsCorrect =
      selectedCategory ===
      currentQuestion.answer;

    setSubmitted(true);

    setScore((previousScore) => ({
      correct:
        previousScore.correct +
        (answerIsCorrect ? 1 : 0),
      total: previousScore.total + 1,
    }));

    const newHistoryEntry: HistoryEntry = {
      id: `${Date.now()}-${Math.random()}`,
      before: currentQuestion.before,
      target: currentQuestion.target,
      after: currentQuestion.after,
      selectedCategory,
      correctCategory:
        currentQuestion.answer,
      isCorrect: answerIsCorrect,
      submittedAt: new Date().toISOString(),
    };

    setHistory((previousHistory) => [
      newHistoryEntry,
      ...previousHistory,
    ].slice(0, 50));
  }

  function showNextQuestion() {
    const nextQuestion = getRandomQuestion(
      enabledCategories,
      currentQuestion.id,
    );

    if (!nextQuestion) {
      alert(
        "Select at least one category in the sidebar.",
      );
      return;
    }

    setCurrentQuestion(nextQuestion);
    setSelectedCategory(null);
    setSubmitted(false);
  }

  return (
    <div className="app-layout">
      <aside className="category-selector">
        <div className="selector-heading">
          <h2>Included categories</h2>

          <p>
            {enabledCategories.length}/
            {categories.length} selected
          </p>

          <p>
            {enabledQuestionCount} sentences available
          </p>
        </div>

        <div className="selector-actions">
          <button
            type="button"
            onClick={selectAllCategories}
          >
            Select all
          </button>

          <button
            type="button"
            onClick={clearAllCategories}
          >
            Clear all
          </button>
        </div>

        {enabledCategories.length === 0 && (
          <p className="selection-warning">
            Select at least one category.
          </p>
        )}

        <div className="category-checkbox-list">
          {categories.map((category) => (
            <label
              className="category-checkbox"
              key={category}
            >
              <input
                type="checkbox"
                checked={enabledCategories.includes(
                  category,
                )}
                onChange={() =>
                  toggleCategory(category)
                }
              />

              <span>
                {formatCategory(category)}
              </span>
            </label>
          ))}
        </div>
      </aside>

      <main className="app">
        <header className="app-header">
          <div>
            <h1>Word Category Trainer</h1>

            <p>
              Select the category of the
              underlined word.
            </p>
          </div>

          <div className="score">
            Score: {score.correct}/{score.total}
          </div>
        </header>

        <section className="question-card">
          <p className="question-pool">
            Random sentence from{" "}
            {enabledQuestionCount} enabled
            sentences
          </p>

          <p className="sentence">
            {currentQuestion.before}
            <span className="target-word">
              {currentQuestion.target}
            </span>
            {currentQuestion.after}
          </p>
        </section>

        <section className="answer-section">
          <div className="category-buttons">
            {categories.map((category) => {
              const isSelected =
                selectedCategory === category;

              const isIncorrectSelection =
                submitted &&
                isSelected &&
                category !==
                  currentQuestion.answer;

              const isCorrectCategory =
                submitted &&
                category ===
                  currentQuestion.answer;

              return (
                <button
                  type="button"
                  className={[
                    "category-button",
                    isSelected
                      ? "selected"
                      : "",
                    isIncorrectSelection
                      ? "incorrect-choice"
                      : "",
                    isCorrectCategory
                      ? "correct-choice"
                      : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  disabled={submitted}
                  key={category}
                  onClick={() =>
                    selectCategory(category)
                  }
                >
                  {formatCategory(category)}
                </button>
              );
            })}
          </div>
        </section>

        {!submitted ? (
          <div className="action-buttons">
            <button
              type="button"
              className="secondary-button"
              onClick={showNextQuestion}
            >
              New random sentence
            </button>

            <button
              type="button"
              className="main-button"
              onClick={submitAnswer}
              disabled={
                selectedCategory === null
              }
            >
              Submit answer
            </button>
          </div>
        ) : (
          <section
            className={`feedback ${
              isCorrect
                ? "correct-feedback"
                : "incorrect-feedback"
            }`}
          >
            <h2>
              {isCorrect
                ? "Correct"
                : "Incorrect"}
            </h2>

            <p>
              {" "}
              <strong>
                {currentQuestion.answer}
              </strong>
            </p>

            <p>
              {currentQuestion.explanation}
            </p>

            <button
              type="button"
              className="main-button"
              onClick={showNextQuestion}
            >
              Next sentence
            </button>
          </section>
        )}

        <section className="history-panel">
          <div className="history-header">
            <h2>Attempt history</h2>

            <p>
              Submitted answers are saved on
              this device.
            </p>

            {history.length > 0 && (
              <button
                type="button"
                className="clear-history-button"
                onClick={clearHistory}
              >
                Clear history
              </button>
            )}
          </div>

          {history.length === 0 ? (
            <p className="history-empty">
              No answers have been submitted yet.
            </p>
          ) : (
            <div className="history-list">
              {history.map((entry) => (
                <article
                  className={`history-entry ${
                    entry.isCorrect
                      ? "correct-history-entry"
                      : "incorrect-history-entry"
                  }`}
                  key={entry.id}
                >
                  <p className="history-sentence">
                    {entry.before}
                    <span className="target-word">
                      {entry.target}
                    </span>
                    {entry.after}
                  </p>

                  <p className="history-result">
                    {entry.isCorrect
                      ? "Correct"
                      : "Incorrect"}
                  </p>

                  {!entry.isCorrect && (
                    <div className="history-error">
                      <span>
                        Your answer:{" "}
                        <strong>
                          {formatCategory(
                            entry.selectedCategory,
                          )}
                        </strong>
                      </span>

                      <span>
                        Correct:{" "}
                        <strong>
                          {formatCategory(
                            entry.correctCategory,
                          )}
                        </strong>
                      </span>
                    </div>
                  )}

                  <p className="history-time">
                    {new Date(
                      entry.submittedAt,
                    ).toLocaleString()}
                  </p>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;