# testerp

Εχω μια εφαρμογή διαχείρισης παραγγελιών nodejs express και την τρέχω στο replit με sqllite η οποία διαγράφεται αυτόματα μετά από κάθε resete. 
Θα έχει 4 πινακες:
Products
OrdersProducts 
Orderitems 
Partners 

Πινακες
Orders
Ημερομηνία: να δέχεται την σημερινή αλλά να μπορεί και να αλλάξει
Όνομα Πελάτη: (text) - required
Τηλέφωνο: (text) - required
Email: (text)
Διεύθυνση: (text)
ΑΦΜ:  (text)
Υπεύθυνος Παραγγελίας: ειναι με dropdown options (ΓΦ, Έφη, Πέτρος, Σκέμπης Γ, Αλμπάντης, Σάκης, Σωτήρης, Γιάννης, Κάτια, ΠΦ)  - required
Πηγή Παραγγελίας: ειναι με dropdown options ( email / τηλέφωνο, μαγ. πόμολα, μαγ. σκιαση, μαγ. πλακάκια) - required
Τύπος Τιμολογίου: (Απόδειξη απλή, Απόδειξη MyData, Τιμολόγιο, Συνδυασμός, Θα μας ενημερώσει) - required
Κατάσταση: (σε επεξεργασία, Ολοκληρώθηκε, Ακυρώθηκε) - προεπθλογή το σε επεξεργασία
Τρόπος Αποστολής: ειναι dropdown options (παραλαβή κατάστημα, παράδοση από fshome, παράδοση με μεταφορική) 
Τρόπος Πληρωμής: ειναι με dropdown options (Μετρητά, Κατάθεση, Κάρτα, Αντικαταβολή, Θα μας ενημερώσει)
Χρόνος Παράδοσης:  (text)
Συνεργάτης: (θα επιλέγει έναν από τους συνεργάτες μέσω αναζήτης ονοματος)
ΠΣ: dropdown options (οχι, ναι) προεπιλογή το όχι
Έξοδα αποστολής: price
Ποσό αντικαταβολής: price
Υποσύνολο: price
Συνολικό Ποσό: price
Πληρωμένο Ποσό: price
Υπόλοιπο: price (Συνολικό ποσό - Πληρωμένο ποσό)


Products
product id (αυξανόμενο +1 κάθε φορά που γίνεται νέα εγγραφή αυτοματα)
Τίτλος (text)
EshopSKU (text)
Εικονα (url ή/και αρχείο jpeg png)
Suppliercode: (text)
Source: options (erp, eshop)

Partners:
partnerid
Ονομα Συνεργάτη: (text) - required
Τηλέφωνο Συνεργάτη: (text)
Email Συνεργάτη: (text)
Τύπος Ιδιότητας: dropdown options (Αρχιτέκτονας, Μηχανικός, Εργολάβος, Διακοσμητής, Επιπλοποιός, Ανακαινίσεις) 

Orderitems
Orderid
Productid
Περιγραφή προϊόντος
Μονάδα Μέτρησης
Ποσότητα:
Τιμή Μονάδας:
Τιμή Ποσότητας: Ποσότητα * Τιμή Μονάδας
Κατάσταση Προϊόντος: dropdown options (παραγγέλθηκε, σε πομολα, σε σκιαση, σε πλακάκια, σε ορφανίδου)
Ημερομηνία κατάστασης: αυτόματη αλλαγή ημερομηνίας κατάστασης
