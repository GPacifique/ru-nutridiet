import Section from './Section';
import ProductCard from './ProductCard';

export default function ProductsSection({ products = [], currency }) {
    if (!products.length) return null;
    return (
        <Section title="Fresh from the shop" intro="Our latest nutrition products." href={route('shop')} linkLabel="See all products">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {products.slice(0, 8).map((p) => <ProductCard key={p.id} product={p} currency={currency} />)}
            </div>
        </Section>
    );
}
