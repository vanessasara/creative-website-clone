import Loader     from '@/components/Loader';
import Nav        from '@/components/Nav';
import Hero       from '@/components/Hero';
import About      from '@/components/About';
import Grids      from '@/components/Grids';
import Typography from '@/components/Typography';
import Colors     from '@/components/Colors';
import Motion     from '@/components/Motion';
import Practice   from '@/components/Practice';
import Resources  from '@/components/Resources';

// Section render order is LOCKED — do not reorder.
export default function Home() {
  return (
    <>
      <Loader />
      <Nav />
      <main id="page_main">
        <Hero />
        <About />
        <Grids />
        <Typography />
        <Colors />
        <Motion />
        <Practice />
        <Resources />
      </main>
    </>
  );
}
