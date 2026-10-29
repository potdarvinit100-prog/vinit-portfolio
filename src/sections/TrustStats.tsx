import { Container, Counter } from '../components/ui';

export default function TrustStats() {
  return (
    <section className="border-y border-white/10 bg-panel/60" aria-label="Highlights">
      <Container>
        <dl className="grid grid-cols-2 md:grid-cols-4 gap-8 py-10">
          <div className="text-center md:text-left">
            <dt className="sr-only">Websites built</dt>
            <dd className="font-display text-3xl font-extrabold text-lime">
              <Counter to={30} suffix="+" />
            </dd>
            <dd className="text-white/60 text-sm mt-1">websites built</dd>
          </div>
          <div className="text-center md:text-left">
            <dd className="font-display text-3xl font-extrabold text-white">VAYN</dd>
            <dd className="text-white/60 text-sm mt-1">startup founder</dd>
          </div>
          <div className="text-center md:text-left">
            <dd className="font-display text-3xl font-extrabold text-white">Full-stack + AI</dd>
            <dd className="text-white/60 text-sm mt-1">websites, apps & automations</dd>
          </div>
          <div className="text-center md:text-left">
            <dd className="font-display text-3xl font-extrabold text-white">Worldwide</dd>
            <dd className="text-white/60 text-sm mt-1">clients, remotely served</dd>
          </div>
        </dl>
      </Container>
    </section>
  );
}
