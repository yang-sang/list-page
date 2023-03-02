//获取表格body
const oTbody = document.querySelector("#tbody");
//获取表格行数
const columnsLength = document.querySelectorAll(".table_item");
//定义添加事件
const handleAdd = () => {
  const tr = document.createElement("tr");
  tr.setAttribute("tabindex", columnsLength + 1);
  tr.setAttribute("class", "table_item");
  oTbody.appendChild(tr);
  oTbody.lastChild.innerHTML = `<td>
                                <input type="checkbox">
                                </td>
                                <td>
                                ${oTbody.children.length - 1}
                                </td>
                                <td>定额票</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>${new Date()
                                  .toISOString()
                                  .slice(0, 10)}</td>
                                <td></td>
                                `;
  oTbody.lastChild
    .querySelector("input")
    .addEventListener("change", handleSingleCheckbox);
  oTbody.lastChild
    .querySelectorAll("td")[3]
    .addEventListener("dblclick", handleDbclick);
  oTbody.lastChild
    .querySelectorAll("td")[4]
    .addEventListener("dblclick", handleDbclick);
  oTbody.lastChild
    .querySelectorAll("td")[5]
    .addEventListener("dblclick", handleDbclick);
  handleSingleCheckbox();
  count();
  handleIndex();
};
//全选非全选
const handleAllCheckbox = (self) => {
  //获取表格行checkbox
  const childrenCheckbox = document.querySelectorAll(".table_item input");
  childrenCheckbox.forEach((item) => {
    item.checked = self.checked;
  });
};

//单选
const handleSingleCheckbox = () => {
  //获取表格行checkbox
  const childrenCheckbox = document.querySelectorAll(".table_item input");
  const allCheckbox = document.querySelector(".table_header input");
  const allChecked = [...childrenCheckbox].every((item) => item.checked);
  allCheckbox.checked = allChecked;
};
//删除
const handleDel = () => {
  const childrenCheckbox = document.querySelectorAll(".table_item input");
  const someChecked = [...childrenCheckbox].some((item) => item.checked);
  if (!someChecked) return alert("请选择要删除的行");
  [...childrenCheckbox].map((item) => {
    if (item.checked) item.parentElement.parentElement.remove();
  });
  handleIndex();
  count();
};
//双击事件
const handleDbclick = (self) => {
  const el = self.target || self;
  const inpt = document.createElement("input");
  console.log(el.childNodes);
  if (el.childNodes.length > 0 && el.childNodes[0].nodeName === "INPUT") return;
  const val = el.innerHTML;
  el.innerHTML = "";
  inpt.value = val;
  inpt.type = "number";
  inpt.addEventListener(
    "blur",
    (event) => {
      const val = event.target.value;
      const tr = event.target.parentElement;
      tr.innerHTML = Number(val).toFixed(2);
      count();
    },
    true
  );
  el.appendChild(inpt);
};

//税价变化，计算
const count = () => {
  const totalTaxPrice = document.querySelector("#totalTaxPrice");
  const tax = document.querySelector("#tax");
  const beforeTax = document.querySelector("#beforeTax");
  const allTableItem = document.querySelectorAll("#tbody .table_item");
  let count = 0,
    taxCount = 0,
    totalTaxPriceCount = 0;
  [...allTableItem].map((item) => {
    count += +(item.children[3].value || item.children[3].innerText);
    taxCount += +(item.children[4].value || item.children[4].innerText);
    item.children[5].innerText = (
      +(item.children[3].value || item.children[3].innerText) +
      +(item.children[4].value || item.children[4].innerText)
    ).toFixed(2);
    totalTaxPriceCount += +(
      item.children[5].value || item.children[5].innerText
    );
  });
  beforeTax.innerText = count.toFixed(2);
  tax.innerText = taxCount.toFixed(2);
  totalTaxPrice.innerText = totalTaxPriceCount.toFixed(2);
};
//索引计算
const handleIndex = () => {
  const items = document.querySelectorAll("#tbody .table_item");
  [...items].map((item, index) => {
    console.log(index);
    item.children[1].innerText = index + 1;
  });
};
window.onload = () => {
  count();
  const header = document.querySelector(".table_header");
  const tbody = document.querySelector(".table");
  tbody.style.maxHeight = 8 * header.clientHeight + "px";
  console.log(header.clientHeight);
};
