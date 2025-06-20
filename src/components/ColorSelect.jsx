import React from "react";

export const ColorSelect = ({ colors, value, onChange }) => {
  const handleSelect = (id) => {
    if (value === id) {
      onChange(null);
    } else {
      onChange(id);
    }
  };
  return (
    <div style={{ padding: '7px 20px 6px', borderRadius: 9, margin: '0 0 8px 0', background: 'var(--card-bg-2)' }}>
      <div className="label" style={{ marginBottom: 8, fontFamily: 'Open Sans', fontSize: 15, fontWeight: 300, letterSpacing: 0.22, opacity: 1, textTransform: 'capitalize' }}>Колір</div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 4 }}>
        {colors.map((color) => {
          const isSelected = value === color.id;
          return (
            <div
              key={color.id}
              title={color.name}
              onClick={() => handleSelect(color.id)}
              style={{
                width: 32,
                height: 32,
                borderRadius: 6,
                background: color.hex,
                border: isSelected ? "3px solid #222" : "2px solid #eee",
                boxSizing: "border-box",
                cursor: "pointer",
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: 'border 0.2s',
              }}
            >
              {isSelected && (
                <span
                  style={{
                    color: color.hex === "#ffffff" ? "#222" : "#fff",
                    fontWeight: "bold",
                    fontSize: 18,
                    position: "absolute",
                  }}
                >
                  ✓
                </span>
              )}
            </div>
          );
        })}
      </div>
      {!value && (
        <div className="label" style={{ color: 'var(--main-color)', fontFamily: 'Open Sans', fontSize: 11, fontWeight: 300, letterSpacing: 0.22, opacity: 0.4, marginTop: 4 }}>Оберіть колір</div>
      )}
    </div>
  );
}; 