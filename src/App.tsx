import { JSX, useState } from 'react';

// Definimos el tipo de producto
type Product = {
  category: string;
  price: string;
  stocked: boolean;
  name: string;
};

// Componente SearchBar
type SearchBarProps = {
  filterText: string;
  inStockOnly: boolean;
  onFilterTextChange: (value: string) => void;
  onInStockOnlyChange: (value: boolean) => void;
};

function SearchBar({
  filterText,
  inStockOnly,
  onFilterTextChange,
  onInStockOnlyChange,
}: SearchBarProps) {
  return (
    <form>
      <input
        type="text"
        value={filterText}
        placeholder="Buscar..."
        onChange={(e) => onFilterTextChange(e.target.value)}
      />
      <label>
        <input
          type="checkbox"
          checked={inStockOnly}
          onChange={(e) => onInStockOnlyChange(e.target.checked)}
        />{' '}
        Mostrar solo productos en stock
      </label>
    </form>
  );
}

// Componente ProductCategoryRow
type ProductCategoryRowProps = {
  category: string;
};

function ProductCategoryRow({ category }: ProductCategoryRowProps) {
  return (
    <tr>
      <th colSpan={2}>{category}</th>
    </tr>
  );
}

// Componente ProductRow
type ProductRowProps = {
  product: Product;
};

function ProductRow({ product }: ProductRowProps) {
  const name = product.stocked ? (
    product.name
  ) : (
    <span style={{ color: 'red' }}>{product.name}</span>
  );

  return (
    <tr>
      <td>{name}</td>
      <td>{product.price}</td>
    </tr>
  );
}

// Componente ProductTable
type ProductTableProps = {
  products: Product[];
  filterText: string;
  inStockOnly: boolean;
};
// Componente principal
type FilterableProductTableProps = {
  products: Product[];
};

function FilterableProductTable({ products }: FilterableProductTableProps) {
  const [filterText, setFilterText] = useState<string>('');
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);

  return (
    <div>
      <SearchBar
        filterText={filterText}
        inStockOnly={inStockOnly}
        onFilterTextChange={setFilterText}
        onInStockOnlyChange={setInStockOnly}
      />
      <ProductTable
        products={products}
        filterText={filterText}
        inStockOnly={inStockOnly}
      />
    </div>
  );
}

// Datos de ejemplo
const PRODUCTS: Product[] = [
  { category: 'Frutas', price: '$1', stocked: true, name: 'Manzana' },
  { category: 'Frutas', price: '$1', stocked: true, name: 'Fruta del dragón' },
  { category: 'Frutas', price: '$2', stocked: false, name: 'Maracuyá' },
  { category: 'Verduras', price: '$2', stocked: true, name: 'Espinaca' },
  { category: 'Verduras', price: '$4', stocked: false, name: 'Calabaza' },
  { category: 'Verduras', price: '$1', stocked: true, name: 'Guisantes' },
];

// App principal
export default function App() {
  return <FilterableProductTable products={PRODUCTS} />;
}
function ProductTable({ products, filterText, inStockOnly }: ProductTableProps) {
  const rows: JSX.Element[] = [];
  let lastCategory: string | null = null;

  products.forEach((product) => {
    if (product.name.toLowerCase().indexOf(filterText.toLowerCase()) === -1) {
      return;
    }
    if (inStockOnly && !product.stocked) {
      return;
    }
    if (product.category !== lastCategory) {
      rows.push(
        <ProductCategoryRow category={product.category} key={product.category} />
      );
    }
    rows.push(<ProductRow product={product} key={product.name} />);
    lastCategory = product.category;
  });

  return (
    <table className='status'>
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Precio</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}


