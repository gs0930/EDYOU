# edYOU: AI-Powered Personalized Education App

## Video Demo
[Click here to watch the video demo!](https://drive.google.com/drive/u/0/folders/10lB_ep2qyP8ZkSsr-TvsCmQXrs0U-mCi)

## Project Description

edYOU is an AI-powered education app designed to create personalized educational content tailored to the needs of each student. It ensures that no child is left behind, regardless of their background, abilities, or learning style. By leveraging cutting-edge technologies, edYOU addresses educational inequities and empowers students worldwide to receive high-quality, customized learning experiences.


## Inspiration

Our team, with members from Singapore, Canada and the US, recognized a global issue: educational inequity. Students worldwide face barriers such as limited access to high-quality resources and mismatched learning styles. Moved by this challenge, we developed edYOU to bridge the gap and provide personalized, AI-driven learning resources tailored to individual needs.

## What edYOU Does

edYOU allows users to input their preferred learning styles and topics of interest. The app generates personalized learning resources using a powerful combination of:

- **Convex's real-time backend platform**
- **InterSystems IRIS Vector Search** for semantic search across custom documents
- **Suno's AI music generation technology**

This ensures that each student gets high-quality educational content suited to their learning preferences and abilities.

## How We Built It

- **Frontend:** Built with **React** for a user-friendly and responsive interface.
- **Backend:** Utilized **FastAPI** and **Node.js** for data processing and API interactions. We integrated:
  - **Suno AI** for music generation
  - **Convex** for real-time backend services
  - **OpenAI/Langchain** for sophisticated text generation
  - **InterSystems IRIS Vector Search** for semantic search

We also integrated **Google search** and **image search** to enhance responses with a comprehensive knowledge base.

## Challenges We Faced

- **Frontend-backend integration:** Managing real-time data flow between the **React** frontend and the **FastAPI/Node.js** backend was challenging. Ensuring smooth communication without delays required careful troubleshooting.
- **LLM output fine-tuning:** Controlling the generated text for specific function calls involved intricate prompt engineering.
- **Time constraints:** We were unable to fully integrate the vector search feature into the frontend before the deadline.

## Accomplishments We're Proud Of

- Successfully built a full-stack application incorporating **Convex**, **InterSystems IRIS**, and **Suno AI**.
- Developed a robust backend that effectively communicates with the frontend for real-time, AI-powered results.
- Tackled educational inequality by offering personalized learning experiences that adapt to each student's needs.

## What We Learned

- Gained valuable technical experience in integrating vector search, LLMs, and APIs.
- Learned the importance of educational equity and the role of technology in creating inclusive learning environments.
- Strengthened our knowledge of real-time backend integration and the challenges of scaling AI-powered applications.

## What's Next for edYOU

- Enhance personalization with advanced machine learning algorithms to better adapt to individual learning styles.
- Expand subject coverage by integrating more datasets and enhancing semantic search.
- Improve scalability for a larger user base and implement accessibility features like text-to-speech and screen readers.
- Partner with educational institutions to broaden our content offerings and provide both free and affordable resources.
