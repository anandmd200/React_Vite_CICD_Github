import { useVirtualizer } from "@tanstack/react-virtual";
import { useRef, useMemo, useCallback, useState } from "react";

// ✅ Complete production-ready virtualized list
function VirtualizedList() {
  const [search, setSearch] = useState("");

  // Simulate 10,000 items
  const allItems = useMemo(
    () =>
      Array.from({ length: 10000 }, (_, i) => ({
        id: i,
        name: `Product ${i + 1}`,
        price: (Math.random() * 100).toFixed(2),
      })),
    [],
  );

  // ✅ useMemo: expensive filtering of 10,000 items
  const filteredItems = useMemo(() => {
    if (!search) return allItems;
    return allItems.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase()),
    );
  }, [allItems, search]);

  const parentRef = useRef(null);

  const virtualizer = useVirtualizer({
    count: filteredItems.length, // Total items
    getScrollElement: () => parentRef.current,
    estimateSize: () => 50, // Each row height in px
    overscan: 5, // Buffer items above/below
  });

  // ✅ useCallback: stable reference for child interaction
  const handleItemClick = useCallback((id: any) => {
    console.log("Selected item:", id);
  }, []);

  return (
    <div>
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search 10,000 items..."
      />
      <p>Showing {filteredItems.length} items</p>

      {/* Scrollable container */}
      <div
        ref={parentRef}
        style={{
          height: "400px",
          overflow: "auto",
          border: "1px solid #ccc",
        }}
      >
        {/* Total height spacer — creates correct scrollbar */}
        <div
          style={{
            height: `${virtualizer.getTotalSize()}px`,
            width: "100%",
            position: "relative",
          }}
        >
          {/* Only renders ~25 items instead of 10,000! */}
          {virtualizer.getVirtualItems().map((virtualRow) => {
            const item = filteredItems[virtualRow.index];
            return (
              <div
                key={item.id}
                onClick={() => handleItemClick(item.id)}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: `${virtualRow.size}px`,
                  transform: `translateY(${virtualRow.start}px)`,
                  padding: "12px",
                  borderBottom: "1px solid #eee",
                  cursor: "pointer",
                }}
              >
                {item.name} — ${item.price}
              </div>
            );
          })}
        </div>
      </div>

      <h1>This is new simple item Virtual list </h1>
      <SimpleVirtualList />
    </div>
  );
}

export default VirtualizedList;

const items = Array.from({ length: 10000 }, (_, index) => ({
  id: index,
  name: `Item ${index}`,
}));

const ITEM_HEIGHT = 20;
const CONTAINER_HEIGHT = 200;
const BUFFER = 2; // extra items above and below

function SimpleVirtualList() {
  const [scrollTop, setScrollTop] = useState(0);

  const startIndex = Math.max(0, Math.floor(scrollTop / ITEM_HEIGHT) - BUFFER);

  const visibleCount = Math.ceil(CONTAINER_HEIGHT / ITEM_HEIGHT);

  const endIndex = Math.min(
    items.length,
    startIndex + visibleCount + BUFFER * 2,
  );

  const visibleItems = items.slice(startIndex, endIndex);

  const totalHeight = items.length * ITEM_HEIGHT;

  const offsetY = startIndex * ITEM_HEIGHT;

  return (
    <div
      style={{
        height: CONTAINER_HEIGHT,
        overflow: "auto",
      }}
      onScroll={(e) => setScrollTop(e.currentTarget.scrollTop)}
    >
      {/* Creates scrollbar height */}
      <div
        style={{
          height: totalHeight,
          position: "relative",
        }}
      >
        {/* Only visible items rendered */}
        <div
          style={{
            transform: `translateY(${offsetY}px)`,
          }}
        >
          {visibleItems.map((item) => (
            <div
              key={item.id}
              style={{
                height: ITEM_HEIGHT,
                borderBottom: "1px solid gray",
              }}
            >
              {item.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
