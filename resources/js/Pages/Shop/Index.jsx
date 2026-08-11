export default function Index({ products, category }) {
    return (
        <div>
            <h1 className="text-3xl font-bold">
                {category
                    ? `${category} Products`
                    : 'RUNUTRIDIET Shop'}
            </h1>

            {/* products */}
        </div>
    );
}