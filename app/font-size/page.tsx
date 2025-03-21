export default function Page() {
  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "800px",
        margin: "0 auto",
        color: "#000000",
      }}
    >
      <h1 style={{ textAlign: "center" }}>
        เปรียบเทียบการใช้ text-size-adjust
      </h1>

      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        {/* ส่วนที่ไม่มีการตั้งค่า text-size-adjust */}
        <div
          style={{
            padding: "20px",
            border: "1px solid #ffcc80",
            borderRadius: "8px",
            backgroundColor: "#fff8e1",
          }}
        >
          <h2>ไม่มีการตั้งค่า text-size-adjust</h2>
          <p
            style={{
              fontSize: "16px",
              lineHeight: "1.6",
            }}
          >
            ข้อความนี้จะปรับขนาดตามการตั้งค่าของระบบ Android
            เมื่อผู้ใช้ตั้งค่าตัวอักษรให้มีขนาดใหญ่ในการตั้งค่ามือถือ
            ข้อความนี้จะขยายขนาดตามไปด้วย
          </p>
        </div>

        {/* ส่วนที่มีการตั้งค่า text-size-adjust: none */}
        <div
          style={{
            padding: "20px",
            border: "1px solid #90caf9",
            borderRadius: "8px",
            backgroundColor: "#e3f2fd",
          }}
        >
          <h2>มีการตั้งค่า text-size-adjust: none</h2>
          <p
            style={{
              fontSize: "16px",
              lineHeight: "1.6",
              textSizeAdjust: "none",
              WebkitTextSizeAdjust: "none",
              MozTextSizeAdjust: "none",
            }}
          >
            ข้อความนี้จะไม่ปรับขนาดตามการตั้งค่าของระบบ Android
            แม้ว่าผู้ใช้จะตั้งค่าตัวอักษรให้มีขนาดใหญ่ในการตั้งค่ามือถือ
            ข้อความนี้จะยังคงมีขนาดเท่าเดิม
          </p>
        </div>
      </div>

      <div
        style={{
          marginTop: "30px",
          padding: "15px",
          backgroundColor: "#f5f5f5",
          borderRadius: "8px",
        }}
      >
        <p>
          <strong>หมายเหตุ:</strong>{" "}
          ความแตกต่างจะเห็นได้ชัดเจนเฉพาะเมื่อทดสอบบนอุปกรณ์ Android
          ที่มีการปรับขนาดตัวอักษรในการตั้งค่าระบบเท่านั้น
        </p>
      </div>
    </div>
  );
}
