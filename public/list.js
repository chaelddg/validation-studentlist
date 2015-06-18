function List() {
    this.listSize = 0;
    this.pos = 0;
    this.dataStore = [];
    this.clear = clear;
    this.find = find;
    this.toString = toString;
    this.insert = insert;
    this.append = append;
    this.remove = remove;
    this.front = front;
    this.end = end;
    this.prev = prev;
    this.next = next;
    this.length = length;
    this.currPos = currPos;
    this.moveTo = moveTo;
    this.getElement = getElement;
    this.length = length;
    this.contains = contains;
}

function append(element) {
    this.dataStore[this.listSize++] = element;
}

function find(element) {
    for (var i = 0; i < this.dataStore.length; ++i) {
        if (this.dataStore[i].idno == element) {
            return i;
        }
    }
    return -1;
}

function remove(element) {
    var foundAt = this.find(element);
    if (foundAt > -1) {
        this.dataStore.splice(foundAt,1);
        --this.listSize;
        return true;
    }
    return false;
}

function length() {
    return this.listSize;
}

function toString() {
    return this.dataStore;
}

function insert(element, after) {
    var insertPos = this.find(after);
    if (insertPos > -1) {
        this.dataStore.splice(insertPos+1, 0, element);
        ++this.listSize;
        return true;
    }
    return false;
}

function clear() {
    delete this.dataStore;
    this.dataStore = [];
    this.listSize = this.pos = 0;
}

function contains(element) {
    for (var i = 0; i < this.dataStore.length; ++i) {
        if (this.dataStore[i] == element) {
            return true;
        }
    }
    return false;
}

function front() {
    this.pos = 0;
}

function end() {
    this.pos = this.listSize-1;
}

function prev() {
    if (this.pos > 0) {
        --this.pos;
    }
}

function next() {
    if (this.pos < this.listSize-1) {
        ++this.pos;
    }
}

function currPos() {
    return this.pos;
}

function moveTo(position) {
    this.pos = position;
}

function getElement() {
    return this.dataStore[this.pos];
}

var list = new List();

var table = document.getElementById('table');

document.getElementById('btnAdd').onclick = function() {
    var txtfname = document.getElementById('txtfname');
    var txtgname = document.getElementById('txtgname');
    var txtmname = document.getElementById('txtmname');
    var txtidno = document.getElementById('txtidno');
    var txtcourse = document.getElementById('txtcourse');

    var fname = txtfname.value;
    var gname = txtgname.value;
    var mname = txtmname.value;
    var idno = txtidno.value;
    var course = txtcourse.value;

    var ok = false;

    for(var x = 0; x < list.dataStore.length; x++) {
        if (list.dataStore[x].idno == idno) {
            ok = true;
            break;
        } else {
            ok = false;
        }
    }

    var obj = {
        "fname" : "",
        "gname" : "",
        "mname" : "",
        "idno" : "",
        "course" : ""
    };

    if (fname !== "" && gname !== "" && mname !== "" && idno !== "" && course !== "" && ok === false) {

        obj.fname = fname.toLowerCase();
        obj.gname = gname.toLowerCase();
        obj.mname = mname.toLowerCase();
        obj.idno = idno;
        obj.course = course.toLowerCase();

        list.append(obj);

        var sorted = list.dataStore.sort(function(a, b){
        var nameA=a.fname.toLowerCase(), nameB=b.fname.toLowerCase();
        if (nameA < nameB)
          return -1;
         if (nameA > nameB)
          return 1;
         return 0;
        });

        $('#alert').show().fadeOut(3000);

        txtfname.value = '';
        txtgname.value = '';
        txtmname.value = '';
        txtidno.value = '';
        txtcourse.value = '';

        while (table.firstChild) {
          table.removeChild(table.firstChild);
        }

        for(var i = 0; i < list.dataStore.length; i++) {
            $(table).append('<tr class="studEntry"><td>'+list.dataStore[i].idno+
                '</td><td>'+list.dataStore[i].fname+
                '</td><td>'+list.dataStore[i].gname+
                '</td><td>'+list.dataStore[i].mname+
                '</td><td>'+list.dataStore[i].course+
                // '</td><td>'+'<button type="button" id="btnDelete" class="btn btnRemove btn-danger"><span class="glyphicon glyphicon-remove-sign" aria-hidden="true"></span></button>&nbsp;<button type="button" id="btnEdit" class="btn btnRemove btn-default"><span class="glyphicon glyphicon-edit" aria-hidden="true"></span></button>'+
                '</td></tr>');
        }

    } else {
        $("#alert2").show().fadeOut(3000);
    }

};

var found;
var s;

document.getElementById('btnFind').onclick = function() {
    var search = document.getElementById('search');
     s = search.value;
    // alert(link.find(s));
    found = list.find(s);
    var myModal = document.getElementById('mbody');

    if (found >= 0) {

        while (myModal.firstChild) {
          myModal.removeChild(myModal.firstChild);
        }
        $(myModal).append('<h4>'+list.dataStore[found].idno.toString()+'\t'+list.dataStore[found].fname.toString()+'\t'+list.dataStore[found].mname.toString()+'\t'+list.dataStore[found].gname.toString()+'\t'+list.dataStore[found].course.toString()+'</h4>'+'\n');

    } else {

        while (myModal.firstChild) {
          myModal.removeChild(myModal.firstChild);
        }
        $(myModal).append('<h4> Student Not Found! </h4>'+'\n');
        var btnEdit = document.getElementById('btnEdit');
        var btnDelete = document.getElementById('btnDelete');

    }

    search.value = '';

};

document.getElementById('btnDelete').onclick = function() {
    var d = list.remove(s);
    if (d === true) {
        while (table.firstChild) {
          table.removeChild(table.firstChild);
        }

        for(var i = 0; i < list.dataStore.length; i++) {
            $(table).append('<tr class="studEntry"><td>'+list.dataStore[i].idno+
                '</td><td>'+list.dataStore[i].fname+
                '</td><td>'+list.dataStore[i].gname+
                '</td><td>'+list.dataStore[i].mname+
                '</td><td>'+list.dataStore[i].course+
                // '</td><td>'+'<button type="button" id="btnDelete" class="btn btnRemove btn-danger"><span class="glyphicon glyphicon-remove-sign" aria-hidden="true"></span></button>&nbsp;<button type="button" id="btnEdit" class="btn btnRemove btn-default"><span class="glyphicon glyphicon-edit" aria-hidden="true"></span></button>'+
                '</td></tr>');
        }
        $("#alert3").show().fadeOut(3000);
    } else {
        // $( "#btnDelete" ).attr( "disabled", "disabled" );
        $("#alert2").show().fadeOut(3000);
    }
};

document.getElementById('btnSave').onclick = function() {
    var editfname = document.getElementById('editfname');
    var editgname = document.getElementById('editgname');
    var editmname = document.getElementById('editmname');
    var editcourse = document.getElementById('editcourse');

    var efname = editfname.value;
    var egname = editgname.value;
    var emname = editmname.value;
    var ecourse = editcourse.value;

    // if (found >= 0) {

        list.dataStore[found].fname = editfname.value;
        list.dataStore[found].gname = editgname.value;
        list.dataStore[found].mname = editmname.value;
        list.dataStore[found].course = editcourse.value;

        // alert(efname, egname, emname, ecourse);

        while (table.firstChild) {
          table.removeChild(table.firstChild);
        }

        for(var i = 0; i < list.dataStore.length; i++) {
            $(table).append('<tr class="studEntry"><td>'+list.dataStore[i].idno+
                '</td><td>'+list.dataStore[i].fname+
                '</td><td>'+list.dataStore[i].gname+
                '</td><td>'+list.dataStore[i].mname+
                '</td><td>'+list.dataStore[i].course+
                // '</td><td>'+'<button type="button" id="btnDelete" class="btn btnRemove btn-danger"><span class="glyphicon glyphicon-remove-sign" aria-hidden="true"></span></button>&nbsp;<button type="button" id="btnEdit" class="btn btnRemove btn-default"><span class="glyphicon glyphicon-edit" aria-hidden="true"></span></button>'+
                '</td></tr>');
        }

        editfname.value = '';
        editgname.value = '';
        editmname.value = '';
        editcourse.value = '';

};

document.getElementById('btnSort').onclick = function() {

    function bubbleSort(a, par){
        var swapped;
        do {
            swapped = false;
            for (var i = 0; i < a.length - 1; i++) {
                if (a[i][par] > a[i + 1][par]) {
                    var temp = a[i];
                    a[i] = a[i + 1];
                    a[i + 1] = temp;
                    swapped = true;
                }
            }
        } while (swapped);
    }


    bubbleSort(list.dataStore, 'fname');

    txtfname.value = '';
    txtgname.value = '';
    txtmname.value = '';
    txtidno.value = '';
    txtcourse.value = '';

    while (table.firstChild) {
      table.removeChild(table.firstChild);
    }

    for(var i = 0; i < list.dataStore.length; i++) {
        $(table).append('<tr class="studEntry"><td>'+list.dataStore[i].idno+
            '</td><td>'+list.dataStore[i].fname+
            '</td><td>'+list.dataStore[i].gname+
            '</td><td>'+list.dataStore[i].mname+
            '</td><td>'+list.dataStore[i].course+
            // '</td><td>'+'<button type="button" id="btnDelete" class="btn btnRemove btn-danger"><span class="glyphicon glyphicon-remove-sign" aria-hidden="true"></span></button>&nbsp;<button type="button" id="btnEdit" class="btn btnRemove btn-default"><span class="glyphicon glyphicon-edit" aria-hidden="true"></span></button>'+
            '</td></tr>');
    }
};
