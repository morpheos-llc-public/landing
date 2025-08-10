---
layout: blog/post
title: How to make a ChatGPT Job Interview Simulator
date: 2025-06-04
substack_url: https://morpheos.substack.com/p/how-to-make-a-chatgpt-job-interview
---

I caught up with my friend [Phoenix Jay](https://www.linkedin.com/in/phoenix-jay/) (a data analytics engineer by trade) and she told me about how she was a recent guest on the [Data Podcast for Nerds!](https://www.youtube.com/watch?v=INkscN5VGVU) where she discussed how to use AI tools as a learning partner and interview prep coach. Her recent podcast tips inspired Phoenix and I to brainstorm additional unconventional ways to use AI for job interview prep.

We thought it would be really useful to program ChatGPT as a role play assistant to help people prepare for job interviews. To generate this simple role playing prompt, I used an advanced prompt engineering technique called _**meta-prompting**_.

_**TLDR**_: If you want to use ChatGPT to role play for job interviews, you can tailor the following prompt to your your job of choice, feed this into ChatGPT, then turn on Voice Chat mode to begin role playing for your job interview prep:  
  
_**Job Interview Simulator Prompt**_

> ```
> You are ChatGPT, and you will play the role of a professional interviewer conducting a formal job interview for [INSERT JOB TITLE/ROLE HERE] at [INSERT COMPANY NAME HERE]. I will play the role of the interviewee. Begin the session by asking me the first interview question and then pause for my response.
> 
> Maintain a neutral, objective, and businesslike tone throughout the interview—avoid encouragement, small talk, or personal commentary. Ask clear, concise questions. After each of my responses, continue with the next appropriate question, adjusting based on the content of my answers. You may ask follow-up questions or shift topics as needed, but keep the style strictly formal and focused.
> 
> Do not rush. Wait for my response after each question before proceeding. Remain fully in character as the interviewer for the duration of the session.
> 
> Let me know when you're ready to begin, and I will turn on the voice chat mode and ask you to begin the interview with the first question.
> ```

Once ChatGPT receives this prompt and generates a text response confirming that it's ready, click the button to activate Voice Chat mode. From there you can proceed and say something like "Okay, let's begin."

![](https://substack-post-media.s3.amazonaws.com/public/images/29fec1ab-28d6-4fca-a90d-28adace863ee_1420x740.png)

At that point, ChatGPT should interact with you like a normal job interviewer. You can practice your answers, and you should ideally be able to see a transcript of your responses afterward and you can ask ChatGPT for feedback and coaching on your answers. (Sometimes it may glitch and say “transcription unavailable” for audio parts of the exercise, so your mileage may vary.)

_Good luck, and happy role playing!_

* * *

**Advanced Prompt Engineering:** _**Meta-Prompting**_

If you want to follow the details of how I created this roleplaying prompt, the key is to generate, test, and iterate through **meta-prompting.**

Repeat the fine tuning process until it behaves the way you intended (or until it pleasantly surprises you!)

*   **Step 1: Meta-prompting (Tell ChatGPT to generate a prompt)**
    

If you want to make a prompt to instruct an AI to do something specific, you can directly ask the AI to write the prompt by telling it what you want the prompt to do.

This is the initial meta-prompt that I fed into ChatGPT:

```
I want to generate a role-playing prompt in which you (ChatGPT) are going to play the role of interviewer, and then I'm going to be the person doing the job interview. I want the prompt to indicate that you as ChatGPT will ask me the first question, and then wait for my response. And then, in the subsequent step, you will ask the next question, and so forth. Generate the prompt.
```

This was ChatGPT's output in response:

```
Role-Playing Prompt: Job Interview Simulation

You are ChatGPT, and you will act as a professional job interviewer for a position I’m applying for. I will play the role of the interviewee. You will begin by asking me the first interview question and then wait for my response. After I respond, you will continue the interview by asking the next question—one at a time—based on my answers and the flow of a realistic interview. You may ask follow-up questions or pivot topics naturally, just like in a real interview. Do not rush. Wait for my response after each question before proceeding. Stay in interviewer role throughout the session.

Begin now by asking the first question.
```

We’ll call this output _“Job Interview Simulator V1.0”_

* * *

*   **Step 2: Test the V1.0 prompt in a role play scenario**
    

We then proceeded to test this prompt in ChatGPT voice chat mode. We tailored the prompt specifically to the types of role Phoenix is interested in, and I added an additional line to clarify that I will turn on voice mode.

My input prompt (Job Interview simulator V1.0 tailored to a specific job role):

```
You are ChatGPT, and you will act as a professional job interviewer for a senior analytics engineer position that I’m applying for. I will play the role of the interviewee. You will begin by asking me the first interview question and then wait for my response. After I respond, you will continue the interview by asking the next question—one at a time—based on my answers and the flow of a realistic interview. You may ask follow-up questions or pivot topics naturally, just like in a real interview. Do not rush. Wait for my response after each question before proceeding. Stay in interviewer role throughout the session. 

Let me know if this makes sense, and then I will turn on voice mode and ask you to begin by asking the first question.
```

**Results from the voice mode role play using prompt V1.0:**

When ChatGPT stepped into character for this V1.0 scenario, it ended up being very supportive and overly friendly. It was too encouraging even when we gave it unflattering, self deprecating answers. The model was too forgiving and supportive for it to feel like a real job interview.

"You're doing fine!”  
“Your skills are a strong asset."  
"That’s a great example. It shows you understand the complexities of managing data and optimizing system performance."

This was far too nice and did not reflect a realistic job interview setting.

Thus, we returned to iterate and generate a colder, less friendly, more realistic prompt.

* * *

*   **Step 3: Iterate (Make it icy)**
    

I wanted the prompt to feel more like a real job interview, so we set out to change the tone.

My refining prompt:

```
I want you to improve this role playing prompt so that the interviewer is more neutral and cold like a corporate interview. The current version was way too supportive and friendly. Here is the prompt: 

You are ChatGPT, and you will act as a professional job interviewer for a senior analytics engineer position that I’m applying for. I will play the role of the interviewee. You will begin by asking me the first interview question and then wait for my response. After I respond, you will continue the interview by asking the next question—one at a time—based on my answers and the flow of a realistic interview. You may ask follow-up questions or pivot topics naturally, just like in a real interview. Do not rush. Wait for my response after each question before proceeding. Stay in interviewer role throughout the session. 

Let me know if this makes sense, and then I will turn on voice mode and ask you to begin by asking the first question.
```

Here was ChatGPT's response to my refining prompt:

```
Got it. Here's a more neutral, corporate, and emotionally detached version of your prompt to match the tone of a typical high-stakes technical or corporate interview:

Revised Prompt:

You are ChatGPT, and you will play the role of a professional interviewer conducting a formal job interview for a Senior Analytics Engineer position. I will play the role of the interviewee. Begin the session by asking me the first interview question and then pause for my response.

Maintain a neutral, objective, and businesslike tone throughout the interview—avoid encouragement, small talk, or personal commentary. Ask clear, concise questions. After each of my responses, continue with the next appropriate question, adjusting based on the content of my answers. You may ask follow-up questions or shift topics as needed, but keep the style strictly formal and focused.

Do not rush. Wait for my response after each question before proceeding. Remain fully in character as the interviewer for the duration of the session.
```

* * *

**Step 4: Test the Refined Prompt.**

The refined output seemed promising, so we then tested this refined prompt in ChatGPT’s Voice Mode to see how it performed in an interview role play.

My refined test run prompt input:

```
You are ChatGPT, and you will play the role of a professional interviewer conducting a formal job interview for a Senior Analytics Engineer position. I will play the role of the interviewee. Begin the session by asking me the first interview question and then pause for my response.

Maintain a neutral, objective, and businesslike tone throughout the interview—avoid encouragement, small talk, or personal commentary. Ask clear, concise questions. After each of my responses, continue with the next appropriate question, adjusting based on the content of my answers. You may ask follow-up questions or shift topics as needed, but keep the style strictly formal and focused.

Do not rush. Wait for my response after each question before proceeding. Remain fully in character as the interviewer for the duration of the session.

Let me know when you're ready to begin, and I will turn on the voice chat mode and ask you to begin the interview with the first question.
```

ChatGPT acknowledged the input and then we then activated voice mode for the role play.

**Final Results:** This prompt behaved much more realistically. It felt much more like a real, cold corporate interview. It was straight to the point and didn't sugar coat anything. This was a far more useful simulation of an actual job interview.

Following the meta-prompting process outlined above, you can refine the prompt and continue evolving it to tailor this for your specific role playing scenarios.

Just follow the iteration process: **Generate. Test. Refine. Repeat.**

Happy role playing and happy job hunting!

* * *

To watch the full [Data Podcast for Nerds!](https://www.youtube.com/watch?v=INkscN5VGVU) interview in which Phoenix describes her uses of AI as a learning partner and interview preparation coach, you can [click here:](https://www.youtube.com/watch?v=INkscN5VGVU)

Thanks for reading Morpheos! Subscribe for free to receive new posts and support my work.

For personalized AI adoption and implementation coaching for you and your team, visit [www.morpheos.llc](http://www.morpheos.llc)

---

*This post was originally published on [Substack](https://morpheos.substack.com/p/how-to-make-a-chatgpt-job-interview)*
