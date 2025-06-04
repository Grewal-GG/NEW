import tkinter as tk
from functools import partial

class Calculator(tk.Tk):
    def __init__(self):
        super().__init__()
        self.title("Calculator")
        self.geometry("300x400")
        self.resizable(False, False)

        self.expression = ""

        self.display = tk.Entry(self, font=("Arial", 20), bd=8, relief=tk.RIDGE, justify="right")
        self.display.grid(row=0, column=0, columnspan=4, padx=10, pady=10, sticky="nsew")
        self._create_buttons()

    def _create_buttons(self):
        btn_texts = [
            '7', '8', '9', '/',
            '4', '5', '6', '*',
            '1', '2', '3', '-',
            '0', 'C', '=', '+'
        ]

        for i, text in enumerate(btn_texts):
            action = partial(self._on_button_click, text)
            button = tk.Button(self, text=text, width=5, height=2, font=("Arial", 18), command=action)
            row, col = divmod(i, 4)
            button.grid(row=row+1, column=col, padx=5, pady=5, sticky="nsew")

        for i in range(4):
            self.grid_columnconfigure(i, weight=1)
        for i in range(5):
            self.grid_rowconfigure(i, weight=1)

    def _on_button_click(self, char):
        if char == 'C':
            self.expression = ""
        elif char == '=':
            try:
                self.expression = str(eval(self.expression))
            except Exception:
                self.expression = "Error"
        else:
            if self.expression == "Error":
                self.expression = ''
            self.expression += str(char)
        self.display.delete(0, tk.END)
        self.display.insert(tk.END, self.expression)

if __name__ == "__main__":
    app = Calculator()
    app.mainloop()
