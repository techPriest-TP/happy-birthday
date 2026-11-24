import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, Award, Download, Sparkles, Star } from "lucide-react";
import { toPng } from "html-to-image";
import { useRef, useState } from "react";
import { Eyebrow, PrimaryButton, Screen } from "../components/experience";
import { pookieConfig as config } from "../data/pookie";

export function Quiz({ onComplete }: { onComplete: () => void }) {
  const [index, setIndex] = useState(0);
  const [answer, setAnswer] = useState<number | null>(null);
  const [finished, setFinished] = useState(false);
  const certificateRef = useRef<HTMLDivElement>(null);
  const question = config.quizQuestions[index];

  const next = () => {
    if (index === config.quizQuestions.length - 1) setFinished(true);
    else {
      setIndex((value) => value + 1);
      setAnswer(null);
    }
  };

  const downloadCertificate = async () => {
    if (!certificateRef.current) return;
    const dataUrl = await toPng(certificateRef.current, {
      pixelRatio: 2,
      backgroundColor: "#fff8f2",
    });
    const link = document.createElement("a");
    link.download = `${config.herName}-pookie-certificate.png`;
    link.href = dataUrl;
    link.click();
  };

  return (
    <Screen className="quiz-screen">
      {!finished ? (
        <>
          <div className="section-intro">
            <Eyebrow>The Pookie Examination Board™</Eyebrow>
            <h1>Advanced Boyfriend Management.</h1>
            <p>Extremely unnecessary. Academically rigorous. No genuinely wrong answers.</p>
          </div>
          <div className="quiz-progress">
            <span style={{ width: `${((index + 1) / config.quizQuestions.length) * 100}%` }} />
          </div>
          <motion.section
            key={index}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="quiz-card"
          >
            <p className="question-count">
              Question {index + 1} / {config.quizQuestions.length}
            </p>
            <h2>{question.question.split("YOUR_NAME").join(config.boyfriendName)}</h2>
            <div className="answer-list">
              {question.answers.map((item, answerIndex) => (
                <button
                  className={`${answer === answerIndex ? "selected" : ""} ${answer === answerIndex && item.isCorrect ? "correct" : ""}`}
                  onClick={() => setAnswer(answerIndex)}
                  key={item.text}
                >
                  <span>{String.fromCharCode(65 + answerIndex)}</span>
                  {item.text}
                </button>
              ))}
            </div>
            <AnimatePresence>
              {answer !== null && (
                <motion.div
                  key={answer}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className={`feedback ${question.answers[answer].isCorrect ? "correct-feedback" : ""}`}
                >
                  <Sparkles size={17} />
                  <p>{question.answers[answer].remark}</p>
                </motion.div>
              )}
            </AnimatePresence>
            <div className="quiz-actions">
              <button className="text-button" onClick={next}>
                Skip
              </button>
              <button
                className="round-next"
                onClick={next}
                disabled={answer === null}
                aria-label="Next question"
              >
                <ArrowRight />
              </button>
            </div>
          </motion.section>
        </>
      ) : (
        <div className="certificate-scene">
          <motion.div
            initial={{ scale: 0.94, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            ref={certificateRef}
            className="certificate"
          >
            <div className="certificate-inner">
              <Award size={38} />
              <p className="certificate-kicker">The Pookie Examination Board™</p>
              <h2>
                Certificate of
                <br />
                Unrivalled Excellence
              </h2>
              <p>This certifies that</p>
              <h3>{config.herName}</h3>
              <p>has graduated with</p>
              <strong>First Class Honours in Being My Favourite Person</strong>
              <div className="signature-row">
                <div>
                  <span>{config.boyfriendName}</span>
                  <small>Very proud boyfriend</small>
                </div>
                <div>
                  <Star fill="currentColor" />
                  <small>{config.birthdayDate}</small>
                </div>
              </div>
            </div>
          </motion.div>
          <button className="soft-button" onClick={downloadCertificate}>
            <Download size={17} /> Save my certificate
          </button>
          <PrimaryButton onClick={onComplete}>Continue with honours</PrimaryButton>
        </div>
      )}
    </Screen>
  );
}

