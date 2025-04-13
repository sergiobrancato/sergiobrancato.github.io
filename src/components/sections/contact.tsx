import { FaPaperPlane } from "react-icons/fa";
import { ShineBorder } from "../magicui/shine-border";

export default function Contact() {
  return (
    <div className="flex flex-col justify-center min-h-screen px-8 md:px-16 lg:px-24">
      <h2 className="text-4xl md:text-5xl font-bold mb-8">Contact Me</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <p className="text-lg mb-6">
            I`&apos;`m always open to new opportunities and collaborations. Feel
            free to reach out if you have a project in mind or just want to
            connect!
          </p>
          <div className="space-y-4">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                <FaPaperPlane className="h-4 w-4 text-primary" />
              </div>
              <span>sergiobrancato01@gmail.com</span>
            </div>
          </div>
        </div>
        <div className=" border-2 rounded-2xl border-muted p-4 py-8 bg-card relative h-[500px] w-full overflow-hidden">
          <ShineBorder shineColor={["#833ab4", "#fd1d1d", "#fcb045"]} />
          <form
            className="space-y-4"
            action="https://formsubmit.co/sergiobrancato01@gmail.com"
            method="POST"
          >
            <div>
              <label htmlFor="name" className="block mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                className="w-full p-3 rounded-md border border-input bg-background"
                placeholder="Your name"
              />
            </div>
            <div>
              <label htmlFor="email" className="block mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full p-3 rounded-md border border-input bg-background"
                placeholder="Your email"
              />
            </div>
            <div>
              <label htmlFor="message" className="block mb-2">
                Message
              </label>
              <textarea
                id="message"
                rows={4}
                className="w-full p-3 rounded-md border border-input bg-background max-h-40 overflow-y-auto"
                placeholder="Your message"
              ></textarea>
            </div>
            <button
              type="submit"
              className="px-6 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors cursor-pointer"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
