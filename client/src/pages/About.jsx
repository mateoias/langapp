import './About.css';

export default function About() {
    return (
      <main className="about-page">
        <section className="jumbotron">
          <h1 className="display-4">About this Site</h1>
        </section>
  
        <section className="article-title">
          <h2>About the author</h2>
          <p>
            Welcome to the computer assisted language learning website. My name is Matthew Werth
            and I have been a language teacher for many years. Currently I am working on
            a number of automated tools to make life easier for language teachers and language learners.
            This tool is an automated language exchange chatbot for students who want to practice their 
            language skills, it is divided into three levels with fine tuned prompts to make language 
            learning easier. The guiding philosophy is CI with TPRS, especially at the lower levels.
          </p>

          <h2>Beginning</h2>
        <p>
          This section is designed for users who are just starting out. This is the hardest part for an AI 
          poweredchatbot and it is still under construction.
        </p>

        <h2>Intermediate</h2>
        <p>
          For learners who can hold a basic conversation This section is fine tuned to help your listening ability 
          and grammar knowledge. It limits vocabulary and focuses on letting you achieve 90% comprehension so that 
          you can internalize grammarical structures.
        </p>

        <h2>Advanced</h2>
        <p>
          Aimed at users with solid speaking skills, this is the easiest type of ;language learning to automate.
          It is a sampling of prompts to make sure tha you focus on language learning with minimal friction.
        </p>
        <h2>About the language exchange chatbot</h2>
          <p>
            The chatbot is powered by <a href="https://openai.com/api/" target="_blank" rel="noreferrer">OpenAI</a>, 
            this is a wrapper for the GPT 4.0 model that has been optimized for conversation 
            based on the level that you choose.
          </p>
  
          <ul>
            <li>The model responses are usually factually accurate, but there is no guarantee and that isn't important for language learning</li>
            <li>GPT hallucinates sometimes, so if the conversation gets too weird, just change the topic and carry on</li>
            <li>You, the human, are ultimately responsible for what happens in these conversations, chatGPT is generally
            eager to please, so it's easy to get it to say weird and/or unsavory things, but that's usually because
            the computer thinks that what you wanted based on your side of the text. </li>
          </ul>

          <p>
                Feel free to contact me with any comments or suggestions:
                &nbsp;<a href="mailto:mateoias@hotmail.com" target="_blank" rel="noopener noreferrer">
            Send Email
                </a>
            </p>
        </section>
      </main>
    );
  }
  