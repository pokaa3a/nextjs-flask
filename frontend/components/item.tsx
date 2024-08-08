export type ItemType = {
  metadata: string;
  payload: string;
};

export function Item(
  { item }: {item: ItemType}
 ) {
  return (
    <a className="block max-w-sm my-2 p-6 bg-white border border-gray-200 rounded-lg shadow bg-gray-100 dark:bg-gray-800 dark:border-gray-700">
      <h1 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{ item.metadata }</h1>
      <p className="font-normal text-gray-700 dark:text-gray-400">{ item.payload }</p>
    </a>
  )
}