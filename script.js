let cleanedCSV = "";

function cleanCSV() {
  const file = document.getElementById("csvInput").files[0];
  if (!file) return alert("Please upload a CSV file first!");

  Papa.parse(file, {
    header: true,
    skipEmptyLines: true,
    complete: function (results) {
      let data = results.data;

      if (document.getElementById("trimSpaces").checked) {
        data = data.map(row => {
          Object.keys(row).forEach(key => {
            if (row[key]) row[key] = row[key].trim();
          });
          return row;
        });
      }

      if (document.getElementById("removeDuplicates").checked) {
        const seen = new Set();
        data = data.filter(row => {
          const str = JSON.stringify(row);
          if (seen.has(str)) return false;
          seen.add(str);
          return true;
        });
      }

      cleanedCSV = Papa.unparse(data);
      document.getElementById("output").textContent = cleanedCSV;
    }
  });
}

function downloadCleaned() {
  if (!cleanedCSV) return alert("Clean the CSV first!");
  const blob = new Blob([cleanedCSV], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "cleaned.csv";
  a.click();
}
