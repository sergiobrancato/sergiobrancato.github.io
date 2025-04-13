import { IconCloud } from "../magicui/icon-cloud";

const icons = [
  "https://img.icons8.com/color/48/adobe-photoshop.png",
  "https://img.icons8.com/color/48/adobe-illustrator.png",
  "https://img.icons8.com/fluency/48/typescript.png",
  "https://img.icons8.com/color/48/canva.png",
  "https://img.icons8.com/color/48/ted.png",
  "https://img.icons8.com/color/48/microsoft-excel-2019--v1.png",
  "https://img.icons8.com/color/48/android-studio--v3.png",
  "https://img.icons8.com/color/48/git.png",
  "https://img.icons8.com/color/48/debian.png",
  "https://img.icons8.com/color/48/flutter.png",
  "https://img.icons8.com/color/48/react-native.png",
  "https://img.icons8.com/color/48/windows-11.png",
  "https://img.icons8.com/color/48/linux.png",
  "https://img.icons8.com/color/48/html-5.png",
  "https://img.icons8.com/color/48/javascript.png",
  "https://cdn4.iconfinder.com/data/icons/social-media-logos-6/512/121-css3-48.png",
  "https://cdn4.iconfinder.com/data/icons/logos-and-brands/512/348_Ubuntu_logo-256.png",
  "https://cdn4.iconfinder.com/data/icons/social-media-logos-6/512/108-analytics_google_analytics_google-256.png",
  "https://cdn4.iconfinder.com/data/icons/miu-black-social-2/60/github-256.png",
];

export default function About() {
  return (
    <div className="flex flex-col justify-center min-h-screen px-8 md:px-16 lg:px-24">
      <h2 className="text-4xl md:text-5xl font-bold mb-8">About Me</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 items-center">
        <div>
          <p className="text-lg mb-4">
            A highly creative and adaptable university student, I am always
            eager to take on new challenges that allow me to grow both
            personally and professionally. I thrive in dynamic environments
            where I can apply my skills while continuously learning and refining
            my expertise.
          </p>
          <p className="text-lg">
            Motivated by curiosity and a strong desire for self-improvement, I
            approach each opportunity with enthusiasm, resilience, and a
            problem-solving mindset. My ability to adapt quickly to different
            situations enables me to navigate complex tasks effectively,
            embracing change as a catalyst for development and innovation.
          </p>
        </div>

        {/* IconCloud centrato verticalmente rispetto al testo */}
        <div className="flex items-center justify-center">
          <div className="">
            <IconCloud images={icons} />
          </div>
        </div>
      </div>

      <div className="flex items-center justify-start mt-0">
        <a
          href="/Sergio-Brancato.pdf"
          download="Sergio Brancato.pdf"
          className="px-6 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
        >
          Download my CV
        </a>
      </div>
    </div>
  );
}
