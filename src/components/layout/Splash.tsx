import Logo from "./Logo";

export default function Splash({ tagline }: { tagline: string }) {
  return (
    <div className="splash" aria-hidden="true">
      <div className="scale-[1.7]">
        <div className="fade-up">
          <Logo />
        </div>
      </div>
      <p className="splash-tagline">{tagline}</p>
      <div className="splash-bar">
        <div className="splash-fill" />
      </div>
    </div>
  );
}