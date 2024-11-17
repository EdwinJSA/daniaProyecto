from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/credito')
def credito():
    return render_template('credito.html')

@app.route('/actCredito')
def actCredito():
    return render_template('actCredito.html')

@app.route('/contado')
def contado():
    return render_template('contado.html')

@app.route('/abonarCredito')
def abonarCredito():
    return render_template('abonarCredito.html')

if __name__ == '__main__':
    app.run(debug=True)
