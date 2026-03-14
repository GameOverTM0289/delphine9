import Link from 'next/link';

const sizes = [
  { s: 'XS', b: '80-84', w: '60-64', h: '86-90' },
  { s: 'S', b: '84-88', w: '64-68', h: '90-94' },
  { s: 'M', b: '88-92', w: '68-72', h: '94-98' },
  { s: 'L', b: '92-96', w: '72-76', h: '98-102' },
  { s: 'XL', b: '96-100', w: '76-80', h: '102-106' },
];

export default function ItemsAndSizesPage() {
  return (
    <>
      <section className="bg-sand-50 pt-32 pb-14">
        <div className="container-custom text-center fade-up">
          <h1 className="heading-1 mb-2">Items & Sizes</h1>
          <p className="text-gray-500">A quick guide to finding your fit.</p>
        </div>
      </section>

      <section className="py-14">
        <div className="container-custom max-w-3xl">
          <h2 className="font-medium mb-4 fade-up">Size Chart (cm)</h2>
          <div className="bg-white border overflow-x-auto mb-8 fade-up delay-1">
            <table className="w-full text-sm">
              <thead className="bg-sand-50">
                <tr>
                  <th className="text-left p-4 font-medium">Size</th>
                  <th className="text-center p-4 font-medium">Bust</th>
                  <th className="text-center p-4 font-medium">Waist</th>
                  <th className="text-center p-4 font-medium">Hips</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {sizes.map((x) => (
                  <tr key={x.s}>
                    <td className="p-4 font-medium">{x.s}</td>
                    <td className="p-4 text-center text-gray-600">{x.b}</td>
                    <td className="p-4 text-center text-gray-600">{x.w}</td>
                    <td className="p-4 text-center text-gray-600">{x.h}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-white border p-6 fade-up delay-2">
            <h2 className="font-medium mb-2">Need the full measuring guide?</h2>
            <p className="text-sm text-gray-600 mb-4">
              We also have a dedicated size guide page with measuring tips.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/size-guide" className="btn-outline">
                View Size Guide
              </Link>
              <Link href="/contact" className="btn-primary">
                Ask for Help
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
