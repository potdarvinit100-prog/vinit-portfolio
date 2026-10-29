import InquiryForm from '../components/InquiryForm';
import { Container, SectionHeading } from '../components/ui';

export default function InquirySection() {
  return (
    <section id="inquiry" className="py-24 scroll-mt-20">
      <Container>
        <SectionHeading
          kicker="Contact"
          title="Start your project"
          sub="Tell me about your business and what you need. I reply to every inquiry personally."
        />
      </Container>
      {/* Form is owned by workstream D — rendered here once its stub is replaced. */}
      <InquiryForm />
    </section>
  );
}
