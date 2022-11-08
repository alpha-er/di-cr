from flask import Flask,render_template,request
import cr

app = Flask(__name__)

@app.route('/', methods = ['POST', 'GET'])
def data():
    if request.method == 'GET':
        return render_template('form.html')
    if request.method == 'POST':
        form_data = request.form
        level = int(form_data['level'])
        view_data = {
            'hell': cr.get_hell(level),
            'cr': cr.get_cr(level)
        }
        return render_template('index.html', view_data = view_data)


app.run(host='127.0.0.1', port=5000, debug=True)
